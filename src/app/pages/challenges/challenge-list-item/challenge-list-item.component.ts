import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Challenge } from 'rocc-client-angular/rocc-client';

@Component({
  selector: 'rocc-challenge-list-item',
  templateUrl: './challenge-list-item.component.html',
  styleUrls: ['./challenge-list-item.component.scss']
})
export class ChallengeListItemComponent implements OnInit {
  @Input()
  challenge!: Challenge;

  @Output() challengeClick: EventEmitter<Challenge> = new EventEmitter<Challenge>();

  constructor() { }

  ngOnInit(): void { }

  onEntityClick(): void {
      this.challengeClick.emit(this.challenge);
  }
}
