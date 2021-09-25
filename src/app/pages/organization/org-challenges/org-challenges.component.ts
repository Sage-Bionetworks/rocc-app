import { Component, Inject, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengeService,
  Organization,
} from '@sage-bionetworks/rocc-client-angular';
import { OrgDataService } from '../org-data.service';
import { Observable } from 'rxjs';
import { isDefined } from '@app/type-guards';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { AuthService } from '@shared/auth/auth.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';
@Component({
  selector: 'rocc-org-challenges',
  templateUrl: './org-challenges.component.html',
  styleUrls: ['./org-challenges.component.scss'],
})
export class OrgChallengesComponent implements OnInit {
  // org!: Organization | undefined;
  loggedIn!: boolean;
  challenges$!: Observable<Challenge[] | undefined>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orgDataService: OrgDataService,
    private challengeService: ChallengeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.challenges$ = this.orgDataService
      .getOrg()
      .pipe(
        switchMap((org) =>
          org !== undefined ? this.getChallenges(org) : of(undefined)
        )
      );

    this.authService
      .isSignedIn()
      .subscribe((loggedIn) => (this.loggedIn = loggedIn));
  }

  getChallenges(org: Organization): Observable<Challenge[]> {
    return this.challengeService
      .listAccountChallenges(org.login, 20, 0)
      .pipe(map((page) => page.challenges));
  }

  onClick(url: string): void {
    // ignore click if text is selected
    if (!this.document.getSelection()!.toString()) {
      this.router.navigateByUrl(url);
    }
  }
}
