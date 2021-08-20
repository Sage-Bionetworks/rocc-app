import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  Challenge,
  ChallengeService,
} from '@sage-bionetworks/rocc-client-angular';
import { switchMap } from 'rxjs/operators';
import { PageTitleService } from '@shared/page-title/page-title.service';

@Component({
  selector: 'rocc-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit {
  challenge$!: Observable<Challenge>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
    private pageTitleService: PageTitleService
  ) {}

  ngOnInit(): void {
    this.challenge$ = this.route.params.pipe(
      switchMap((params) => this.challengeService.getChallenge(params.id))
    );

    this.challenge$.subscribe(challenge => {
      this.pageTitleService.setTitle(challenge.name);
    });
  }
}
