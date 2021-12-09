import {
  AfterViewInit,
  Component,
  OnInit,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  Inject,
} from '@angular/core';
import { FilterValue } from '@shared/filters/filter-value.model';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import {
  Challenge,
  ChallengePlatformService,
  ChallengeService,
  DateRange,
} from '@sage-bionetworks/rocc-client-angular';
import {
  challengeStartDateRangeFilterValues,
  challengeStartYearRangeFilterValues,
  challengeStatusFilterValues,
  challengeDifficultyFilterValues,
  challengeSubmissionTypesFilterValues,
  challengeInputDataTypesFilterValues,
  challengeIncentiveTypesFilterValues,
  searchTermsFilterValues,
  sortByFilterValues,
  previewTypeFilterValues,
} from './challenge-search-filters-values';
import { FilterComponent } from '@shared/filters/filter.component';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import flow from 'lodash/fp/flow';
import keyBy from 'lodash/fp/keyBy';
import mapValues from 'lodash/fp/mapValues';
import { ChallengeSearchQuery } from './challenge-search-query';
import deepEqual from 'deep-equal';
import { BehaviorSubject, Observable } from 'rxjs';
import { ButtonToggleFilterValue } from '@app/shared/filters/button-toggle-filter/button-toggle-filter-value';
import assign from 'lodash-es/assign';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@shared/auth/auth.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const defaultChallengeSearchQuery: ChallengeSearchQuery = {
  limit: 0,
  offset: 0,
  sort: undefined,
  direction: undefined,
  searchTerms: '',
  topics: [],
  inputDataTypes: [],
  status: [],
  platformIds: [],
  difficulty: [],
  submissionTypes: [],
  incentiveTypes: [],
  startYearRange: {} as DateRange | string,
  startDateRange: {} as DateRange,
  orgIds: [],
  organizerIds: [],
  sponsorIds: [],
};

@Component({
  selector: 'rocc-challenge-search',
  templateUrl: './challenge-search.component.html',
  styleUrls: ['./challenge-search.component.scss'],
})
export class ChallengeSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  challenges: Challenge[] = [];
  @ViewChildren(FilterComponent) filters!: QueryList<FilterComponent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private query: BehaviorSubject<ChallengeSearchQuery> =
    new BehaviorSubject<ChallengeSearchQuery>(defaultChallengeSearchQuery);

  limit = 10;
  offset = 0;
  searchResultsCount = 0;
  loggedIn = false;
  useYearRange = true;
  display = 'list';
  challengeList!: Observable<Challenge[]>;
  dataSource!: MatTableDataSource<Challenge>;

  challengeStatusFilterValues: FilterValue[] = challengeStatusFilterValues;
  challengeStartDateRangeFilterValues: FilterValue[] =
    challengeStartDateRangeFilterValues;
  challengeStartYearRangeFilterValues: FilterValue[] =
    challengeStartYearRangeFilterValues;
  challengeDifficultyFilterValues: FilterValue[] =
    challengeDifficultyFilterValues;
  challengeSubmissionTypesFilterValues: FilterValue[] =
    challengeSubmissionTypesFilterValues;
  challengeIncentiveTypesFilterValues: FilterValue[] =
    challengeIncentiveTypesFilterValues;
  challengeInputDataTypesFilterValues: FilterValue[] =
    challengeInputDataTypesFilterValues;
  challengePlatformFilterValues: FilterValue[] = [];
  previewTypeFilterValues: ButtonToggleFilterValue[] = previewTypeFilterValues;
  searchTermsFilterValues = searchTermsFilterValues;
  sortByFilterValues: FilterValue[] = sortByFilterValues;

  constructor(
    private router: Router,
    private authService: AuthService,
    private pageTitleService: PageTitleService,
    private challengeService: ChallengeService,
    private challengePlatformService: ChallengePlatformService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle('Search Challenges • ROCC');
    this.listChallengePlatforms();

    this.authService
      .isSignedIn()
      .subscribe((loggedIn) => (this.loggedIn = loggedIn));
  }

  ngAfterViewInit(): void {
    const selectedFilters = this.filters
      .filter((f) => f.name !== 'previewType')
      .map((f) => f.getStateAsObservable()); // use f to prevent shadow name

    combineLatest(selectedFilters)
      .pipe(
        map((filters) => flow([keyBy('name'), mapValues('value')])(filters)),
        map((query): ChallengeSearchQuery => {
          // if not custom selected, replace dateRange with yearRange
          if (this.useYearRange && query.startYearRange !== 'custom') {
            query.startDateRange = query.startYearRange;
          }
          if (query.sort !== undefined) {
            query.sort = query.sort.toString();
            query.direction =
              query.sort.substring(0, 1) === '-' ? 'desc' : 'asc';
            query.sort = query.sort.substring(
              ['+', '-'].includes(query.sort.substring(0, 1)) ? 1 : 0
            );
          }
          if (query.searchTerms === '') {
            query.searchTerms = undefined;
          }
          return {
            limit: this.limit,
            offset: (this.offset = 0),
            ...query,
          } as ChallengeSearchQuery;
        }),
        distinctUntilChanged(deepEqual)
      )
      .subscribe((query: ChallengeSearchQuery) => {
        this.challenges = [];
        this.query.next(query);
      });

    this.query
      .pipe(
        tap((query) => console.log('List challenges', query)),
        switchMap((query) =>
          this.challengeService.listChallenges(
            query.limit,
            query.offset,
            query.sort,
            query.direction,
            query.searchTerms,
            query.topics,
            query.inputDataTypes,
            query.status,
            query.platformIds,
            query.difficulty,
            query.submissionTypes,
            query.incentiveTypes,
            query.startDateRange,
            query.orgIds,
            query.organizerIds,
            query.sponsorIds
          )
        )
      )
      .subscribe(
        (page) => {
          if (page) {
            this.searchResultsCount = page.totalResults ? page.totalResults : 0;
            this.challenges.push(...page.challenges);
            this.dataSource = new MatTableDataSource<Challenge>(
              this.challenges
            );
            this.challenges.map((c) => console.log(c.fullName));
            // prevent total results from being overwritten in dataSource
            setTimeout(() => (this.paginator.length = this.searchResultsCount));
            this.dataSource.paginator = this.paginator;
            this.challengeList = this.dataSource.connect();
          }
        },
        (err) => console.log(err)
      );
  }

  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  private listChallengePlatforms(): void {
    // TODO: Get all pages
    this.challengePlatformService
      .listChallengePlatforms(100)
      .pipe(
        map((page) => page.challengePlatforms),
        map((platforms) =>
          platforms.sort((a, b) => a.name.localeCompare(b.name))
        )
      )
      .subscribe(
        (platforms) => {
          this.challengePlatformFilterValues = platforms.map(
            (platform) =>
              ({
                value: platform.id,
                title: platform.displayName,
                active: false,
              } as FilterValue)
          );
        },
        (err) => console.log(err),
        () => console.log('Get platforms complete')
      );
  }

  // showMoreResults(): void {
  //   const query = assign(this.query.getValue(), {
  //     offset: this.offset + this.limit,
  //     limit: this.limit,
  //   });
  //   this.query.next(query);
  // }

  dateRangeChanged(isChanged: boolean) {
    // change radio button checked value
    this.challengeStartYearRangeFilterValues.map((value) => {
      value.active = value.value === 'custom';
    });
    this.useYearRange = !isChanged;
  }

  yearRangeChanged(isChanged: boolean) {
    this.useYearRange = isChanged;
  }

  updateQuery(): void {
    const query = assign(this.query.getValue(), {
      offset: this.offset,
      limit: this.limit,
    });
    this.query.next(query);
  }

  changeDisplay(mode: string) {
    this.display = mode;
  }

  onClick(url: string): void {
    // ignore click if text is selected
    if (!this.document.getSelection()!.toString()) {
      this.router.navigateByUrl(url);
    }
  }

  onPaginate(event: PageEvent): void {
    if (this.limit !== event.pageSize) {
      this.limit = event.pageSize;
      this.updateQuery();
    }

    if (event.previousPageIndex! < event.pageIndex) {
      this.offset = this.offset + this.limit;
      this.updateQuery();
    }
  }
}
