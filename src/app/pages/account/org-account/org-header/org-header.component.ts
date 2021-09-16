import { Component, Input, OnInit } from '@angular/core';
import {
  OrgMembershipService,
  Organization,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { map as _map, uniqBy as _uniqBy } from 'lodash-es';

@Component({
  selector: 'rocc-org-header',
  templateUrl: './org-header.component.html',
  styleUrls: ['./org-header.component.scss'],
})
export class OrgHeaderComponent implements OnInit {
  @Input() org!: Organization;
  numPeople$!: Observable<number>;

  // mock data
  numChallenges = 10;

  tmpOrg = {
    id: '613931c6bef3ffc6e5091e4b',
    email: 'contact@example.org',
    login: 'sage-bionetworks',
    name: 'Sage Bionetworks',
    avatarUrl: 'assets/img/sage-bionetworks.png',
    websiteUrl: 'https://sagebionetworks.org/',
  };

  constructor(private orgMembershipService: OrgMembershipService) {}

  ngOnInit(): void {
    this.numPeople$ = this.orgMembershipService
      .listOrgMemberships(50, 0, this.org.id, undefined)
      .pipe(
        map((page) => page.orgMemberships),
        map((orgMemberships) =>
          _map(_uniqBy(orgMemberships, 'userId'), 'userId')
        ),
        map((userIds) => (userIds === undefined ? 0 : userIds.length))
      );
  }
}
