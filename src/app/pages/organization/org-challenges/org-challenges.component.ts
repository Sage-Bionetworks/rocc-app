import {
  AfterViewInit,
  OnDestroy,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Challenge,
  ChallengeService,
  Organization,
} from '@sage-bionetworks/rocc-client-angular';
import { OrgDataService } from '../org-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '@shared/auth/auth.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'rocc-org-challenges',
  templateUrl: './org-challenges.component.html',
  styleUrls: ['./org-challenges.component.scss'],
})
export class OrgChallengesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private query: BehaviorSubject<{ limit?: number; offset?: number }> =
    new BehaviorSubject<{ limit?: number; offset?: number }>({
      limit: 10,
      offset: 0,
    });

  limit = 10;
  offset = 0;
  searchResultsCount = 0;

  org!: Organization | undefined;
  dataSource!: MatTableDataSource<Challenge>;
  loggedIn!: boolean;
  challenges: Challenge[] = [];
  challenges$!: Observable<Challenge[]>;

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
    this.query
      .pipe(
        switchMap((query) => {
          if (this.org) {
            return this.challengeService.listAccountChallenges(
              this.org.login,
              query.limit,
              query.offset
            );
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe((page) => {
        if (page && page.totalResults != 0) {
          this.searchResultsCount = page.totalResults ? page.totalResults : 0;
          this.challenges.push(...page.challenges);
          this.dataSource = new MatTableDataSource<Challenge>(this.challenges);
          // prevent total results from being overwritten in dataSource
          setTimeout(() => (this.paginator.length = this.searchResultsCount));
          this.dataSource.paginator = this.paginator;
          this.challenges$ = this.dataSource.connect();
        }
      });
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
