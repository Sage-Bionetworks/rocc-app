import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  ChallengePlatformService,
  Challenge,
  ChallengePlatform,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'rocc-challenge-header',
  templateUrl: './challenge-header.component.html',
  styleUrls: ['./challenge-header.component.scss'],
})
export class ChallengeHeaderComponent implements OnInit {
  @Input() accountName = '';
  @Input() challenge!: Challenge;
  @Input() isFavorite!: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  progressValue: number = 0;
  platform$!: Observable<ChallengePlatform>;

  constructor(private challengePlatformService: ChallengePlatformService) {}

  ngOnInit(): void {
    this.platform$ = this.challengePlatformService.getChallengePlatform(
      this.challenge?.platformId!
    );
  }

  getProgress(challenge: Challenge): number {
    if (challenge.status == 'active') {
      // if either of start/endDates not provided, still show progress bar, but return zero
      if (
        typeof challenge.startDate !== 'undefined' &&
        typeof challenge.endDate !== 'undefined'
      ) {
        const totalTime =
          +new Date(challenge.endDate!) - +new Date(challenge.startDate!);
        const runTime = +new Date() - +new Date(challenge.startDate!);
        this.progressValue = (runTime / totalTime) * 100;
      }
    } else {
      this.progressValue = challenge.status == 'completed' ? 100 : 0;
    }

    return this.progressValue;
  }

  public toggleSelected() {
    this.isFavorite = !this.isFavorite;
    this.selectedChange.emit(this.isFavorite);
  }
}
