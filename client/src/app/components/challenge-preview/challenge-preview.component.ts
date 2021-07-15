import { Component, OnInit } from '@angular/core';
import challengeList from '../../seeds/dream/challenges-fix.json';

@Component({
  selector: 'rocc-challenge-preview',
  templateUrl: './challenge-preview.component.html',
  styleUrls: ['./challenge-preview.component.scss']
})

export class ChallengePreviewComponent implements OnInit {

  // TODO: change challenges type to Challenge[] when we pull data from database
  rawChallenges: any;
  newChallenges: any;
  platform = 'synapse';
  tabLabelList = ['All', 'Open', 'Closed', 'Upcoming'];

  constructor() { }

  ngOnInit(): void {
    this.rawChallenges = challengeList.challenges;
    this.newChallenges = challengeList.challenges;
  }

  tabMonitor(event: any): void {

    if (event.index !== 0) {
      const selectedTab = event.tab.textLabel.toLowerCase();
      this.newChallenges = this.rawChallenges.filter((challenge: any) => {
        return challenge.status === selectedTab;
      });
    } else {
      this.newChallenges = this.rawChallenges;
    }
  }
}
