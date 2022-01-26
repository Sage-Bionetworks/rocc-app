import { Component, Input, OnDestroy, OnInit, Inject } from '@angular/core';
import {
  Challenge,
  User,
  UserService,
} from '@sage-bionetworks/rocc-client-angular';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'rocc-user-profile-starred',
  templateUrl: './user-profile-starred.component.html',
  styleUrls: ['./user-profile-starred.component.scss'],
})
export class UserProfileStarredComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  @Input() loggedIn!: boolean;

  stars: Challenge[] = [];
  starred!: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (this.user) {
      const starsSub = this.userService
        .listUserStarredChallenges(this.user.id)
        .pipe(map((page) => page.challenges))
        .subscribe((stars) => (this.stars = stars));
      this.subscriptions.push(starsSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onClick(url: string): void {
    if (!this.document.getSelection()!.toString()) {
      this.router.navigateByUrl(url);
    }
  }
}
