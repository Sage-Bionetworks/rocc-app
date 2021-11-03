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
} from '@sage-bionetworks/rocc-client-angular';
import { ChallengeDataService } from '../challenge-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Avatar } from '@sage-bionetworks/sage-angular';

@Component({
  selector: 'rocc-challenge-overview',
  templateUrl: './challenge-overview.component.html',
  styleUrls: ['./challenge-overview.component.scss'],
})
export class ChallengeOverviewComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  accountName!: string;
  challenge!: Challenge;
  organizers!: ChallengeOrganizer[];
  sponsors!: ChallengeSponsor[];
  readme$!: Observable<ChallengeReadme>;
  displayedColumns: string[] = ['name', 'login', 'role'];
  organizerList!: MatTableDataSource<any> | undefined;
  sponsorList!: MatTableDataSource<any> | undefined;

  constructor(
    private route: ActivatedRoute,
    private challengeDataService: ChallengeDataService,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
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
        tap((sponsorList) => {
          const sponsors = sponsorList.challengeSponsors;
          this.sponsorList =
            sponsors.length > 0 ? new MatTableDataSource(sponsors) : undefined;
          setTimeout(() => {
            if (this.sponsorList) {
              this.sponsorList.sort = this.sort;
            }
          });
        }),
        switchMap(() =>
          this.challengeService.listChallengeOrganizers(
            this.accountName,
            this.challenge.name
          )
        )
      )
      .subscribe((organizerList: ChallengeOrganizerList) => {
        const organizers = organizerList.challengeOrganizers;
        this.organizerList =
          organizers.length > 0
            ? new MatTableDataSource(organizers)
            : undefined;
        setTimeout(() => {
          if (this.organizerList) {
            this.organizerList.sort = this.sort;
          }
        });
      });

    this.readme$ = this.challengeDataService.getReadme();
  }

  // TODO: use avatarUrl once we can access
  getAvatar(name: string): Avatar {
    return {
      name: name,
      src: '',
      size: 30,
    };
  }
}
