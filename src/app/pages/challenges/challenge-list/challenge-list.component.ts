import { Component, OnInit } from '@angular/core';
import {
  Challenge, ChallengeService
} from '@sage-bionetworks/rocc-client-angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'rocc-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss'],
})
export class ChallengeListComponent implements OnInit {
  private _challenges: Challenge[] | undefined = [];
  private _searchResultsCount = 0;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.challengeService.listChallenges()
      .subscribe(page => this._challenges = page.challenges);
  }

  get challenges(): Challenge[] | undefined {
    return this._challenges;
  }

  get searchResultsCount(): number {
    return this._searchResultsCount;
  }

  onChallengeClick(challenge: Challenge): void {
    console.log('Challenge clicked');
    // this.entityClick.emit(entity);
  }
}
