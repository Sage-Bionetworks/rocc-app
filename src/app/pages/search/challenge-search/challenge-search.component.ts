import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FilterValue } from '@shared/filters/filter-value.model';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import { Challenge, DateRange } from '@sage-bionetworks/rocc-client-angular';
import { challengeStatusFilterValues } from './challenge-search-filters-values';
import { FilterComponent } from '@shared/filters/filter.component';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import flow from 'lodash/fp/flow';
import keyBy from 'lodash/fp/keyBy';
import mapValues from 'lodash/fp/mapValues';
import { ChallengeSearchQuery } from './challenge-search-query';
import deepEqual from 'deep-equal';
import { BehaviorSubject } from 'rxjs';

const defaultChallengeSearchQuery: ChallengeSearchQuery = {
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
  selector: 'rocc-challenge-search',
  templateUrl: './challenge-search.component.html',
  styleUrls: ['./challenge-search.component.scss'],
})
export class ChallengeSearchComponent implements OnInit, AfterViewInit {
  challenges: Challenge[] = [];
  @ViewChildren(FilterComponent) filters!: QueryList<FilterComponent>;
  private query: BehaviorSubject<ChallengeSearchQuery> =
  new BehaviorSubject<ChallengeSearchQuery>(defaultChallengeSearchQuery);

  limit = 10;
  offset = 0;
  challengeStatusFilterValues: FilterValue[] = challengeStatusFilterValues;

  constructor(private pageTitleService: PageTitleService) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle('Search Challenges • ROCC');
  }

  ngAfterViewInit(): void {
    const selectedFilters = this.filters
      .filter((f) => f.name !== 'previewType')
      .map((f) => f.getStateAsObservable()); // use f to prevent shadow name

    combineLatest(selectedFilters)
      .pipe(
        map((filters) => flow([keyBy('name'), mapValues('value')])(filters)),
        map((query): ChallengeSearchQuery => {
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
          } as ChallengeSearchQuery;
        }),
        distinctUntilChanged(deepEqual)
      )
      .subscribe((query: ChallengeSearchQuery) => {
        console.log('query', query);
        this.challenges = [];
        this.query.next(query);
      });
  }
}
