import { Component, Input, OnInit } from '@angular/core';
import {
  Challenge,
  ChallengePlatformService,
  ChallengePlatform,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'rocc-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss'],
})
export class CardPreviewComponent implements OnInit {
  @Input() challenge!: Challenge;
  platform$!: Observable<ChallengePlatform>;
  constructor(private challengePlatformService: ChallengePlatformService) {}

  ngOnInit(): void {
    this.platform$ = this.challengePlatformService.getChallengePlatform(
      this.challenge!.platformId!
    );
    this.platform$.subscribe(console.log);
  }
}
