import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss']
})
export class ChallengeViewComponent implements OnInit {
  private _challenge!: Challenge;

  constructor() { }

  ngOnInit(): void {
  }

  get challenge() {
    return this._challenge;
  }

  @Input()
  set challenge(challenge) {
      this._challenge = challenge;
  }
}
