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
@Component({
  selector: 'rocc-org-people',
  templateUrl: './org-people.component.html',
  styleUrls: ['./org-people.component.scss'],
})
export class OrgPeopleComponent implements OnInit {
  // org!: Organization | undefined;
  persons$!: Observable<User[]>;
  constructor(
    private orgDataService: OrgDataService,
    private userService: UserService,
    private orgMembershipService: OrgMembershipService
  ) {}

  ngOnInit(): void {
    this.persons$ = this.orgDataService.getOrg().pipe(
      switchMap((org) =>
        this.orgMembershipService.listOrgMemberships(50, 0, org!.id, undefined)
      ),
      switchMap((page) => {
        return forkJoin(
          page.orgMemberships.map((orgMember) =>
            this.userService.getUser(orgMember.userId)
          )
        );
      })
    );
  }
}
