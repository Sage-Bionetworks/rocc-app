import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  Challenge, ChallengeService
} from '@sage-bionetworks/rocc-client-angular';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { flow, keyBy, mapValues, capitalize, values, merge as mergeFp } from 'lodash/fp';
import { FiltersComponent } from 'src/app/components/filters/filters.component';
import { ChallengeFilter } from '@sage-bionetworks/rocc-client-angular';
import { Filter } from 'src/app/components/filters/filter.model';

@Component({
  selector: 'rocc-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss'],
})
export class ChallengeListComponent implements OnInit, AfterViewInit {
  private _challenges: Challenge[] = [];
  searchResultsCount = 0;

  @ViewChildren(FiltersComponent) filters!: QueryList<FiltersComponent>;

  private _querySource: any = {};
  private query: BehaviorSubject<any> = new BehaviorSubject<any>({});

  orderFilters: Filter[] = [];

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.orderFilters = values({
      RELEVANCE: {
          value: 'relevance',
          title: 'Relevance',
          active: true,
      },
      NEWEST: {
          value: '-createdAt',
          title: `Newest challenges`,
      },
      OLDEST: {
          value: 'createdAt',
          title: `Oldest challenges`,
      },
    });


    // this.challengeService.listChallenges()  // first page
    //   .subscribe(page => this._challenges = page.challenges);
  }

  ngAfterViewInit(): void {
    let selectedFilters = this.filters
      // .filter(f => f.group !== 'previewType')
      .map(f => f.getSelectedFilter());

    combineLatest(selectedFilters)
      .pipe(
        map(myFilters => flow([keyBy('group'), mapValues('value')])(myFilters))
      )
      .subscribe(query => {
        console.log('Query', query)
          this._challenges = [];
          // this.searchResultsCount = 0;
          // this.page = 0;
          this.query.next(query);
      });

    this.query
      .pipe(
          map(query => mergeFp(query, this.querySource)),
          tap(query => console.log('query 2', query)),
          // mapTo(
          //   {
          //     name: 'DREAM',
          //     status: 'open'
          //   }
          // ),
          switchMap(query => this.challengeService.listChallenges(20, 0, query as ChallengeFilter))
      )
      .subscribe(res => {
          if (res) {
            this.searchResultsCount = res.totalResults ? res.totalResults : 0;
            this.challenges.push(...res.challenges);
          }
      }, err => console.error(err));
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
}
