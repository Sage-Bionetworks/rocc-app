import {
  AfterViewInit,
  OnDestroy,
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  Challenge,
  ChallengeService,
  Organization,
} from '@sage-bionetworks/rocc-client-angular';
import { OrgDataService } from '../org-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '@shared/auth/auth.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import assign from 'lodash-es/assign';
import {
  ChallengeSearchQuery,
  defaultChallengeSearchQuery,
  searchTermsFilterValues,
} from './org-challenge-search-query';
import { FilterComponent } from '@shared/filters/filter.component';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import flow from 'lodash/fp/flow';
import keyBy from 'lodash/fp/keyBy';
import mapValues from 'lodash/fp/mapValues';
import deepEqual from 'deep-equal';

@Component({
  selector: 'rocc-org-challenges',
  templateUrl: './org-challenges.component.html',
  styleUrls: ['./org-challenges.component.scss'],
})
export class OrgChallengesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChildren(FilterComponent) filters!: QueryList<FilterComponent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private query: BehaviorSubject<ChallengeSearchQuery> =
    new BehaviorSubject<ChallengeSearchQuery>(defaultChallengeSearchQuery);

  limit = 10;
  offset = 0;
  searchResultsCount = 0;
  searchTermsFilterValues = searchTermsFilterValues;

  org!: Organization | undefined;
  dataSource!: MatTableDataSource<Challenge>;
  loggedIn!: boolean;
  challenges: Challenge[] = [];
  challengeList$!: Observable<Challenge[]>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orgDataService: OrgDataService,
    private challengeService: ChallengeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.authService
      .isSignedIn()
      .subscribe((loggedIn) => (this.loggedIn = loggedIn));

    this.orgDataService.getOrg().subscribe((org) => (this.org = org));
  }

  ngAfterViewInit(): void {
    const selectedFilters = this.filters
      .filter((f) => f.name !== 'previewType')
      .map((f) => f.getStateAsObservable()); // use f to prevent shadow name

    combineLatest(selectedFilters)
      .pipe(
        map((filters) => flow([keyBy('name'), mapValues('value')])(filters)),
        map((query): ChallengeSearchQuery => {
          if (query.searchTerms === '') {
            query.searchTerms = undefined;
          }
          return {
            limit: this.limit,
            offset: this.offset,
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
        switchMap((query) => {
          if (this.org) {
            return this.challengeService.listAccountChallenges(
              this.org.login,
              query.limit,
              query.offset,
              query.searchTerms
            );
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe(
        (page) => {
          if (page) {
            this.searchResultsCount = page.totalResults ? page.totalResults : 0;
            this.challenges.push(...page.challenges);
            this.dataSource = new MatTableDataSource<Challenge>(
              this.challenges
            );
            setTimeout(() => (this.paginator.length = this.searchResultsCount));
            this.dataSource.paginator = this.paginator;
            this.challengeList$ = this.dataSource.connect();
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

  onClick(url: string): void {
    // ignore click if text is selected
    if (!this.document.getSelection()!.toString()) {
      this.router.navigateByUrl(url);
    }
  }

  updateQuery(): void {
    const query = assign(this.query.getValue(), {
      offset: this.offset,
      limit: this.limit,
    });
    this.query.next(query);
  }

  onPaginate(event: PageEvent): void {
    if (event.previousPageIndex! < event.pageIndex) {
      this.offset = this.offset + this.limit;
      this.updateQuery();
    }
  }
}
