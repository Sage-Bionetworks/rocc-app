import { Component, Input, OnInit } from '@angular/core';
import { Avatar } from '@sage-bionetworks/sage-angular/src/lib/avatar';
import {
  OrgMembershipService,
  User,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { map as _map, uniqBy as _uniqBy } from 'lodash-es';
import { UserService } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-user-profile-bar',
  templateUrl: './user-profile-bar.component.html',
  styleUrls: ['./user-profile-bar.component.scss'],
})
export class UserProfileBarComponent implements OnInit {
  @Input() user!: User;
  @Input() userAvatar!: Avatar;
  numOrgs$!: Observable<number>;

  // mock up summary data
  isVerified = true;
  numStarredChallenges$!: Observable<number>;

  constructor(
    private orgMembershipService: OrgMembershipService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userAvatar = {
      name: this.user.name
        ? (this.user.name as string)
        : this.user.login.replace(/-/g, ' '),
      src: this.user.avatarUrl!,
      size: 160,
    };

    this.numOrgs$ = this.orgMembershipService
      .listOrgMemberships(50, 0, undefined, this.user.id)
      .pipe(
        map((page) => page.orgMemberships),
        map((orgMemberships) =>
          _map(_uniqBy(orgMemberships, 'organizationId'), 'organizationId')
        ),
        map((orgIds) => (orgIds === undefined ? 0 : orgIds.length))
      );

    this.numStarredChallenges$ = this.userService
      .listUserStarredChallenges(this.user.id, 10, 0)
      .pipe(map(page => page.totalResults));
  }
}
