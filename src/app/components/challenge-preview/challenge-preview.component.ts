import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChallengeService, Challenge, ChallengeStatus, } from '@sage-bionetworks/rocc-client-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rocc-challenge-preview',
  templateUrl: './challenge-preview.component.html',
  styleUrls: ['./challenge-preview.component.scss']
})

export class ChallengePreviewComponent implements OnInit, OnDestroy {

  rawChallenges: Challenge[] = [];
  newChallenges: Challenge[] = [];
  private challengeSub!: Subscription;

  platform = 'synapse';
  tabLabelList = ['All', 'Open', 'Closed', 'Upcoming'];

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.challengeSub = this.challengeService.listChallenges(100)
      .subscribe(res => {
        if (res.challenges) {
          this.rawChallenges = res.challenges;
          this.newChallenges = res.challenges;
        }
      },
        err => console.error(err)
      );
  }

  tabMonitor(event: any): void {

    if (event.index !== 0) {
      // TODO: consider to use @param filter directly from listChallenges
      const selectedTab: ChallengeStatus = event.tab.textLabel.toLowerCase();
      this.newChallenges = this.rawChallenges.filter((challenge: Challenge) => {
        return challenge.status === selectedTab;
      });
    } else {
      this.newChallenges = this.rawChallenges;
    }
  }

  ngOnDestroy(): void {
    this.challengeSub.unsubscribe();
  }
}
