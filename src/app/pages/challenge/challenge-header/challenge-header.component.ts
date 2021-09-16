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

    this.progressValue =
      this.challenge.status == 'active'
        ? (this.progressValue =
            this.challenge.startDate !== undefined &&
            this.challenge.endDate !== undefined
              ? this.calcProgress(
                  new Date().toUTCString(),
                  this.challenge.startDate!,
                  this.challenge.endDate!
                )
              : 0)
        : this.challenge.status == 'completed'
        ? 100
        : 0;
  }

  calcDays(startDate: string, endDate: string): number {
    let timeDiff = +new Date(endDate) - +new Date(startDate);
    return timeDiff / (1000 * 60 * 60 * 24);
  }

  calcProgress(today: string, startDate: string, endDate: string): number {
    return (
      (this.calcDays(startDate, today) / this.calcDays(startDate, endDate)) *
      100
    );
  }

  calcRemainDays(today: string, endDate: string): void {}

  public toggleSelected() {
    this.isFavorite = !this.isFavorite;
    this.selectedChange.emit(this.isFavorite);
  }
}
