import { Component, OnInit } from '@angular/core';
import {
  Organization,
  User,
  UserService,
  OrgMembershipService,
} from '@sage-bionetworks/rocc-client-angular';
import { OrgDataService } from '../org-data.service';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'rocc-org-people',
  templateUrl: './org-people.component.html',
  styleUrls: ['./org-people.component.scss'],
})
export class OrgPeopleComponent implements OnInit {
  // org!: Organization | undefined;
  persons$!: Observable<User[] | undefined>;
  constructor(
    private orgDataService: OrgDataService,
    private userService: UserService,
    private orgMembershipService: OrgMembershipService
  ) {}

  ngOnInit(): void {
    this.persons$ = this.orgDataService
      .getOrg()
      .pipe(
        switchMap((org) =>
          org !== undefined ? this.getPersons(org) : of(undefined)
        )
      );
  }

  getPersons(org: Organization): Observable<User[]> {
    return this.orgMembershipService
      .listOrgMemberships(20, 0, org.id, undefined)
      .pipe(
        switchMap((page) => {
          return forkJoin(
            page!.orgMemberships.map((orgMember) =>
              this.userService.getUser(orgMember.userId)
            )
          );
        })
      );
  }
}
