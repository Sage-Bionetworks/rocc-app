import { Component, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengeService,
} from '@sage-bionetworks/rocc-client-angular';
import { OrgDataService } from '../org-data.service';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@shared/auth/auth.service';
@Component({
  selector: 'rocc-org-challenges',
  templateUrl: './org-challenges.component.html',
  styleUrls: ['./org-challenges.component.scss'],
})
export class OrgChallengesComponent implements OnInit {
  // org!: Organization | undefined;
  accountName: string = '';
  loggedIn!: boolean;
  challenges$!: Observable<Challenge[] | []>;

  constructor(
    private orgDataService: OrgDataService,
    private challengeService: ChallengeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.challenges$ = this.orgDataService.getOrg().pipe(
      tap((org) => (this.accountName = org ? org.login : '')),
      switchMap((org) =>
        this.challengeService.listAccountChallenges(org!.login, 50, 0)
      ),
      map((page) => page.challenges)
    );

    this.authService
      .isSignedIn()
      .subscribe((loggedIn) => (this.loggedIn = loggedIn));
  }
}
