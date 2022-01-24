import { Component, Inject, OnInit } from '@angular/core';
import {
  Organization,
  User,
  UserService,
  OrgMembershipService,
} from '@sage-bionetworks/rocc-client-angular';
import { OrgDataService } from '../org-data.service';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'rocc-org-people',
  templateUrl: './org-people.component.html',
  styleUrls: ['./org-people.component.scss'],
})
export class OrgPeopleComponent implements OnInit {
  // org!: Organization | undefined;
  persons$!: Observable<User[] | undefined>;
  constructor(
    private router: Router,
    private orgDataService: OrgDataService,
    private userService: UserService,
    private orgMembershipService: OrgMembershipService,
    @Inject(DOCUMENT) private document: Document
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

  onClick(url: string): void {
    if (!this.document.getSelection()!.toString()) {
      this.router.navigateByUrl(url);
    }
  }
}
