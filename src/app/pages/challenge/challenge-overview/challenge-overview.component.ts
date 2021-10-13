import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import {
  Challenge,
  ChallengeReadme,
  ChallengeService,
  ChallengeOrganizerList,
  ChallengeOrganizer,
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
  readme$!: Observable<ChallengeReadme>;
  displayedColumns: string[] = ['name', 'userId', 'role'];
  dataSource!: MatTableDataSource<any> | undefined;

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
          this.challengeService.listChallengeOrganizers(
            this.accountName,
            this.challenge.name
          )
        )
      )
      .subscribe((organizerList: ChallengeOrganizerList) => {
        const organizers = organizerList.challengeOrganizers;
        this.organizers = organizers;
        this.dataSource =
          organizers.length > 0
            ? new MatTableDataSource(organizers)
            : undefined;
        setTimeout(() => {
          if (this.dataSource) {
            this.dataSource.sort = this.sort;
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
