import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  Challenge,
  ChallengeService,
  ChallengePlatformService,
  DateRange,
  TagService,
} from '@sage-bionetworks/rocc-client-angular';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import flow from 'lodash/fp/flow';
import keyBy from 'lodash/fp/keyBy';
import mapValues from 'lodash/fp/mapValues';
import { FilterComponent } from '@shared/filters/filter.component';
import { FilterValue } from '@shared/filters/filter-value.model';
import { assign } from 'lodash-es';
import { ButtonToggleFilterValue } from '@shared/filters/button-toggle-filter/button-toggle-filter-value';
import {
  challengeStartDateRangeFilterValues,
  challengeStatusFilterValues,
  challengeTypeFilterValues,
  orderByFilterValues,
  previewTypeFilterValues,
  tagFilterValues,
  searchTermsFilterValues,
} from './challenge-list-filters-values';
// import { shallowEqual } from '../../../shallowEqual';
import deepEqual from 'deep-equal';
import { ChallengeListQuery } from './challenge-list-query';
import { PageTitleService } from 'sage-angular/dist/sage-angular';
// import { DateRange } from 'src/app/components/filters/date-range-filter/date-range';

const emptyChallengeListQuery: ChallengeListQuery = {
  limit: 0,
  offset: 0,
  sort: 'createdAt',
  direction: 'asc',
  searchTerms: '',
  tagIds: [],
  status: [],
  platformIds: [],
  startDateRange: {} as DateRange,
};

@Component({
  selector: 'rocc-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss'],
})
export class ChallengeListComponent implements OnInit, AfterViewInit {
  challenges: Challenge[] = [];
  @ViewChildren(FilterComponent) filters!: QueryList<FilterComponent>;
  private query: BehaviorSubject<ChallengeListQuery> =
    new BehaviorSubject<ChallengeListQuery>(emptyChallengeListQuery);

  limit = 10;
  offset = 0;
  orderByFilterValues: FilterValue[] = orderByFilterValues;
  challengeTypeFilterValues: FilterValue[] = challengeTypeFilterValues;
  previewTypeFilterValues: ButtonToggleFilterValue[] = previewTypeFilterValues;
  tagFilterValues: FilterValue[] = [];
  challengePlatformFilterValues: FilterValue[] = [];
  challengeStatusFilterValues: FilterValue[] = challengeStatusFilterValues;
  challengeStartDateRangeFilterValues: FilterValue[] =
    challengeStartDateRangeFilterValues;
  searchTermsFilterValues = searchTermsFilterValues;
  searchResultsCount = 0;

  constructor(
    private challengePlatformService: ChallengePlatformService,
    private challengeService: ChallengeService,
    private tagService: TagService,
    private pageTitleService: PageTitleService
  ) {}

  ngOnInit(): void {
    this.listTags();
    this.listChallengePlatforms();
    this.pageTitleService.setTitle('Challenges');
  }

  ngAfterViewInit(): void {
    const selectedFilters = this.filters
      .filter((f) => f.name !== 'previewType')
      .map((f) => f.getStateAsObservable()); // use f to prevent shadow name

    combineLatest(selectedFilters)
      .pipe(
        map((filters) => flow([keyBy('name'), mapValues('value')])(filters)),
        map((query): ChallengeListQuery => {
          query.sort = undefined;
          query.direction = undefined;
          if (query.orderBy !== undefined) {
            query.sort = query.orderBy.substring(
              ['+', '-'].includes(query.orderBy.substring(0, 1)) ? 1 : 0
            );
            query.direction =
              query.orderBy.substring(0, 1) === '-' ? 'desc' : 'asc';
            delete query.orderBy;
          }
          if (query.searchTerms === '') {
            query.searchTerms = undefined;
          }
          return {
            limit: this.limit,
            offset: (this.offset = 0),
            ...query,
          } as ChallengeListQuery;
        }),
        distinctUntilChanged(deepEqual)
      )
      .subscribe((query: ChallengeListQuery) => {
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
            query.tagIds,
            query.status,
            query.platformIds,
            query.startDateRange
          )
        )
      )
      .subscribe(
        (page) => {
          if (page) {
            this.searchResultsCount = page.totalResults ? page.totalResults : 0;
            this.challenges.push(...page.challenges);
          }
        },
        (err) => console.log(err)
      );
  }

  onChallengeClick(challenge: Challenge): void {
    console.log('Challenge clicked');
    // this.entityClick.emit(entity);
  }

  showMoreResults(): void {
    const query = assign(this.query.getValue(), {
      offset: this.offset + this.limit,
      limit: this.limit,
    });
    this.query.next(query);
  }

  checkAllTags(): void {
    this.tagFilterValues = this.tagFilterValues.map((value) => ({
      ...value,
      active: true,
    }));
  }

  private listTags(): void {
    // TODO: Get all pages
    this.tagService
      .listTags(100)
      .pipe(
        map((page) => page.tags),
        map((tags) => tags.sort((a, b) => a.id.localeCompare(b.id)))
      )
      .subscribe(
        (tags) => {
          this.tagFilterValues = tags.map(
            (tag) =>
              ({
                value: tag.id,
                title: tag.id,
                active: false,
              } as FilterValue)
          );
        },
        (err) => console.log(err),
        () => console.log('Get tags complete')
      );
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
                title: platform.name,
                active: false,
              } as FilterValue)
          );
        },
        (err) => console.log(err),
        () => console.log('Get platforms complete')
      );
  }
}
