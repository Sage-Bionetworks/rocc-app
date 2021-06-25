import { Component, OnInit } from '@angular/core';
import challengeList from '../../seeds/dream/challenges.json';

@Component({
  selector: 'rocc-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss']
})
export class PreviewCardComponent implements OnInit {
  
  constructor() { }

  challenges = challengeList.challenges

  ngOnInit(): void {
  }

}
