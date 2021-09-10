import { Component, Input, OnInit } from '@angular/core';
import { Avatar } from '@sage-bionetworks/sage-angular/src/lib/avatar';
import {
  OrgMembershipService,
  User,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { map as _map, uniqBy as _uniqBy } from 'lodash-es';

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
  numFavs = 10;

  constructor(private orgMembershipService: OrgMembershipService) {}

  ngOnInit(): void {
    this.userAvatar = {
      name: this.user.name as string,
      src: this.user.avatarUrl as string,
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
  }
}
