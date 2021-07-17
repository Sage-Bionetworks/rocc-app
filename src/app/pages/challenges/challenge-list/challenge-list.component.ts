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
} from '@sage-bionetworks/rocc-client-angular';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { flow, keyBy, mapValues, values, merge as mergeFp } from 'lodash/fp';
import { FilterComponent } from 'src/app/components/filters/filter.component';
import { FilterValue } from 'src/app/components/filters/filter-value.model';
import { assign } from 'lodash';
import { ButtonToggleFilterValue } from 'src/app/components/filters/button-toggle-filter/button-toggle-filter-value';
import {
  challengeTypeFilterValues,
  orderByFilterValues,
  platformFilterValues,
  previewTypeFilterValues,
} from './challenge-list-filters-values';

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
  tagFilterValues: FilterValue[] = [];
  platformFilterValues: FilterValue[] = platformFilterValues;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.tagFilterValues = values({
      DIGITAL: {
        value: 'digital',
        title: 'digital',
        active: true,
      },
      GENE: {
        value: 'gene',
        title: 'gene',
        active: true,
      },
    });

    // this.challengeService.listChallenges()  // first page
    //   .subscribe(page => this._challenges = page.challenges);
  }

  ngAfterViewInit(): void {
    let selectedFilters = this.filters
      // .filter(f => f.group !== 'previewType')
      .map((filter) => filter.getStateAsObservable());

    combineLatest(selectedFilters)
      .pipe(
        tap((filters) => console.log('filter befofe flow', filter)),
        map((filters) => flow([keyBy('name'), mapValues('value')])(filters)),
        tap((filters) => console.log('filter after flow', filter))
      )
      .subscribe((query) => {
        console.log('Query', query);
        this._challenges = [];
        query.limit = this.limit;
        query.offset = this.offset = 0;
        // this.resultsOffset = 0;
        this.query.next(query);
      });

    this.query
      .pipe(
        map((query) => mergeFp(query, this.querySource)),
        tap((query) => console.log('query 2', query)),
        map((query) => {
          let orderBy = query.orderBy;
          query.sort = orderBy.substring(
            ['+', '-'].includes(orderBy.substring(0, 1)) ? 1 : 0
          );
          query.direction = orderBy.substring(0, 1) == '-' ? 'desc' : 'asc';
          query.filter = {
            name: query.name,
          };
          return query;
        }),
        tap((query) => console.log('final query', query)),
        // mapTo(
        //   {
        //     name: 'DREAM',
        //     status: 'open'
        //   }
        // ),
        switchMap((query) =>
          this.challengeService.listChallenges(
            query.limit,
            query.offset,
            // query.filter as ChallengeFilter,
            query.sort,
            query.direction
          )
        ) // TODO: extract filter from query
      )
      .subscribe(
        (res) => {
          if (res) {
            this.searchResultsCount = res.totalResults ? res.totalResults : 0;
            this.challenges.push(...res.challenges);
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
    let query = assign(this.query.getValue(), {
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
}
