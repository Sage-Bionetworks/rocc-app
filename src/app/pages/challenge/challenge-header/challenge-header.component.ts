import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Challenge } from '@sage-bionetworks/rocc-client-angular';
@Component({
  selector: 'rocc-challenge-header',
  templateUrl: './challenge-header.component.html',
  styleUrls: ['./challenge-header.component.scss'],
})
export class ChallengeHeaderComponent implements OnInit {
  @Input() challenge!: Challenge;
  @Input() selected!: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  progressValue: number = 0;
  // tmp for testing
  platform = 'https://www.assets/img/logo/synapse.svg';

  constructor() {}

  ngOnInit(): void {
    this.platform = this.platform.replace('https://www.', '');
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
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}
