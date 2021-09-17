import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Challenge,
  User,
  UserService,
} from '@sage-bionetworks/rocc-client-angular';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rocc-user-profile-starred',
  templateUrl: './user-profile-starred.component.html',
  styleUrls: ['./user-profile-starred.component.scss'],
})
export class UserProfileStarredComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  stars: Challenge[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const starsSub = this.userService
      .listUserStarredChallenges(this.user.id)
      .pipe(map((page) => page.challenges))
      .subscribe((stars) => (this.stars = stars));
    this.subscriptions.push(starsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
