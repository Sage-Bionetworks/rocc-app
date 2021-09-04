import { Component, Input } from '@angular/core';
import { Challenge } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-challenge-header',
  templateUrl: './challenge-header.component.html',
  styleUrls: ['./challenge-header.component.scss'],
})
export class ChallengeHeaderComponent {
  @Input() challenge!: Challenge;

  constructor() {}
}
