import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rocc-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss']
})
export class ChallengeListComponent implements OnInit {
  private _searchResultsCount = 0;

  constructor() { }

  ngOnInit(): void {

  }

  get searchResultsCount(): number {
    return this._searchResultsCount;
  }
}
