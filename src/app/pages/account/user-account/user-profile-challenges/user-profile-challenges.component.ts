import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge, UserService } from '@sage-bionetworks/rocc-client-angular';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'rocc-user-profile-challenges',
  templateUrl: './user-profile-challenges.component.html',
  styleUrls: ['./user-profile-challenges.component.scss'],
})
export class UserProfileChallengesComponent implements OnInit {
  @Input() userId!: string;
  challenges$!: Observable<Challenge[]>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.challenges$ = this.userService
      .getUserStarredChallenges(this.userId)
      .pipe(map((page) => page.challenges));
  }
}
