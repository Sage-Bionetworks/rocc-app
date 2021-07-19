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
  ChallengePlatform,
  ChallengePlatformService,
  DateRange,
  Tag,
  TagService,
} from '@sage-bionetworks/rocc-client-angular';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, distinctUntilKeyChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { flow, keyBy, mapValues, values, merge as mergeFp } from 'lodash/fp';
import { FilterComponent } from 'src/app/components/filters/filter.component';
import { FilterValue } from 'src/app/components/filters/filter-value.model';
import { assign } from 'lodash';
import { ButtonToggleFilterValue } from 'src/app/components/filters/button-toggle-filter/button-toggle-filter-value';
import {
  challengeStartDateRangeFilterValues,
  challengeStatusFilterValues,
  challengeTypeFilterValues,
  orderByFilterValues,
  previewTypeFilterValues,
  tagFilterValues,
  searchTermsFilterValues
} from './challenge-list-filters-values';
// import { shallowEqual } from '../../../shallowEqual';
import deepEqual from 'deep-equal';
import { ChallengeListQuery } from './challenge-list-query';

@Component({
  selector: 'rocc-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss'],
})
export class ChallengeListComponent implements OnInit, AfterViewInit {
  private _challenges: Challenge[] = [];
  searchResultsCount = 0;
  limit = 10;
  offset = 0;

  @ViewChildren(FilterComponent) filters!: QueryList<FilterComponent>;

  private _querySource: any = {};
  private query: BehaviorSubject<any> = new BehaviorSubject<any>({});

  orderByFilterValues: FilterValue[] = orderByFilterValues;
  challengeTypeFilterValues: FilterValue[] = challengeTypeFilterValues;
  previewTypeFilterValues: ButtonToggleFilterValue[] = previewTypeFilterValues;
  tagFilterValues: FilterValue[] = tagFilterValues;
  challengePlatformFilterValues: FilterValue[] = [];
  challengeStatusFilterValues: FilterValue[] = challengeStatusFilterValues;
  challengeStartDateRangeFilterValues: FilterValue[] =
    challengeStartDateRangeFilterValues;
  searchTermsFilterValues = searchTermsFilterValues;

  constructor(
    private challengePlatformService: ChallengePlatformService,
    private challengeService: ChallengeService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.listTags();
    // this.listChallengePlatforms();
    this._challenges = [];
  }

  ngAfterViewInit(): void {
    const selectedFilters = this.filters
      // .filter(f => f.group !== 'previewType')
      .map((f) => f.getStateAsObservable()); // use f to prevent shadow name

    combineLatest(selectedFilters)
      .pipe(
        tap((filters) => console.log('filter befofe flow', filters)),
        map((filters) => ({
          limit: this.limit,
          offset: (this.offset = 0),
          ...flow([keyBy('name'), mapValues('value')])(filters)
        }) as ChallengeListQuery),
        tap((filters) => console.log('filter after flow', filters)),
        distinctUntilChanged(deepEqual),
        // distinctUntilChanged((prev, curr) => {
        //   console.log('prev', prev);
        //   console.log('curr', curr);
        //   return prev == curr;
        // }),
        // distinctUntilKeyChanged('limit')
      )
      .subscribe((query: any) => {
        console.log('Query', query);
        this._challenges = [];
        // query.limit = this.limit;
        // query.offset = this.offset = 0;
        // this.resultsOffset = 0;
        this.query.next(query);
      });

    this.query
      .pipe(
        map((query) => mergeFp(query, this.querySource)),
        tap((query) => console.log('query 2', query)),
        map((query) => {
          if (query.orderBy !== undefined) {
            query.sort = query.orderBy.substring(
              ['+', '-'].includes(query.orderBy.substring(0, 1)) ? 1 : 0
            );
            query.direction =
              query.orderBy.substring(0, 1) === '-' ? 'desc' : 'asc';
          }

          if (query.searchTerms === '') {
            query.searchTerms = undefined;
          }

          return query;
        }),
        tap((query) => console.log('final query', query)),
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
        ) // TODO: extract filter from query
      )
      .subscribe(
        (res) => {
          if (res) {
            this.searchResultsCount = res.totalResults ? res.totalResults : 0;
            this.challenges.push(...res.challenges);
            // this._challenges = res.challenges;
          }
        },
        (err) => console.error(err)
      );
  }

  get challenges(): Challenge[] {
    return this._challenges;
  }

  // get searchResultsCount(): number {
  //   return this._searchResultsCount;
  // }

  get querySource(): any {
    return this._querySource;
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
    /* Mutating properties does not trigger the two-way binding change update. */
    // this.tagFilterValues.forEach((value) => {
    //   value.active = true;
    // });

    /* Setting the entire data triggers the two-way binding change update. */
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
        (err) => console.log,
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
        (err) => console.log,
        () => console.log('Get platforms complete')
      );
  }
}
