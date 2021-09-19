import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { isDefined, isUndefined } from '@app/type-guards';
import {
  Challenge,
  ChallengeService,
  ChallengeReadme,
} from '@sage-bionetworks/rocc-client-angular';
import { merge, of } from 'rxjs';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ChallengeDataService } from '../challenge-data.service';

@Component({
  selector: 'rocc-challenge-overview',
  templateUrl: './challenge-overview.component.html',
  styleUrls: ['./challenge-overview.component.scss'],
})
export class ChallengeOverviewComponent implements OnInit {
  challenge$!: Observable<Challenge>;
  readme$!: Observable<ChallengeReadme>;

  constructor(private challengeDataService: ChallengeDataService) {}

  ngOnInit(): void {
    this.challenge$ = this.challengeDataService.getChallenge();
    this.readme$ = this.challengeDataService.getReadme();
  }
}
