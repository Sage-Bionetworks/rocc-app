import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss']
})
export class ChallengeCardComponent {
  @Input()
  challenge!: Challenge;
  // TODO: delete this constant and replace with platform property in html
  platform = 'synapse';

  constructor() {}
}
