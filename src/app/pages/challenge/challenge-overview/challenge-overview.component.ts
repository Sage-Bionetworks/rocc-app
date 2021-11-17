import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import {
  Challenge,
  ChallengeReadme,
  ChallengeService,
  ChallengeOrganizerList,
  ChallengeOrganizer,
  ChallengeSponsor,
  UserService,
  OrganizationService,
} from '@sage-bionetworks/rocc-client-angular';
import { ChallengeDataService } from '../challenge-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Avatar } from '@sage-bionetworks/sage-angular';
import {
  Organization,
  User,
} from 'rocc-client-angular/projects/rocc-client/src';

@Component({
  selector: 'rocc-challenge-overview',
  templateUrl: './challenge-overview.component.html',
  styleUrls: ['./challenge-overview.component.scss'],
})
export class ChallengeOverviewComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  accountName!: string;
  challenge!: Challenge;
  readme$!: Observable<ChallengeReadme>;
  displayedColumns: string[] = ['name', 'login', 'role'];
  organizers!: MatTableDataSource<ChallengeOrganizer> | undefined;
  sponsors!: ChallengeSponsor[];
  users: User[] = [];
  orgs: Organization[] = [];

  constructor(
    private route: ActivatedRoute,
    private challengeDataService: ChallengeDataService,
    private challengeService: ChallengeService,
    private userService: UserService,
    private orgService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.userService.listUsers().subscribe((page) => (this.users = page.users));
    this.orgService
      .listOrganizations()
      .subscribe((page) => (this.orgs = page.organizations));

    this.route.params
      .pipe(
        tap((params) => (this.accountName = params.login)),
        switchMap(() => this.challengeDataService.getChallenge()),
        tap((challenge) => (this.challenge = challenge)),
        switchMap(() =>
          this.challengeService.listChallengeSponsors(
            this.accountName,
            this.challenge.name
          )
        ),
        tap((sponsorList) => (this.sponsors = sponsorList.challengeSponsors)),
        switchMap(() =>
          this.challengeService.listChallengeOrganizers(
            this.accountName,
            this.challenge.name
          )
        )
      )
      .subscribe((organizerList: ChallengeOrganizerList) => {
        const organizers = organizerList.challengeOrganizers;
        this.organizers =
          organizers.length > 0
            ? new MatTableDataSource(organizers)
            : undefined;
        setTimeout(() => {
          if (this.organizers) {
            this.organizers.sort = this.sort;
          }
        });
      });

    this.readme$ = this.challengeDataService.getReadme();
  }

  getOrganizerAvatar(organizer: ChallengeOrganizer): Avatar {
    const user = this.users.find((user) => user.login === organizer.login) || {
      avatarUrl: '',
    };
    return {
      name: organizer.name,
      src: user.avatarUrl!,
      size: 30,
    };
  }

  getSponsorAvatar(sponsor: ChallengeSponsor): Avatar {
    const org = this.orgs.find((org) => org.login === sponsor.login) || {
      avatarUrl: '',
    };
    return {
      name: sponsor.name,
      src: org.avatarUrl!,
      size: 80,
    };
  }
}
