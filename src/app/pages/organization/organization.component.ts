import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import {
  AccountService,
  Organization,
  OrganizationService,
  ModelError as RoccClientError,
} from '@sage-bionetworks/rocc-client-angular';
import { isRoccClientError } from '@shared/rocc-client-error';
import { OrgDataService } from './org-data.service';

@Component({
  selector: 'rocc-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  org$!: Observable<Organization | undefined>;
  orgNotFound = false;

  sections: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private orgService: OrganizationService,
    private pageTitleService: PageTitleService,
    private orgDataService: OrgDataService
  ) {}

  ngOnInit(): void {
    this.org$ = this.route.params.pipe(
      switchMap((params) => this.accountService.getAccount(params.orgName)),
      switchMap((account) => this.orgService.getOrganization(account.id)),
      catchError((err) => {
        const error = err.error as RoccClientError;
        if (isRoccClientError(error)) {
          if (error.status === 404) {
            return of(undefined);
          }
        }
        return throwError(err);
      })
    );

    this.org$.subscribe((org) => {
      const pageTitle = org ? `${org.name}` : 'Page not found';
      this.pageTitleService.setTitle(`${pageTitle} · ROCC`);
      this.orgNotFound = !org;
      this.orgDataService.setOrg(org);

      this.sections = [
        {
          label: 'Overview',
          path: `/${org?.login}`,
        },
        {
          label: 'Challenges',
          path: 'challenges',
        },
        {
          label: 'People',
          path: 'people',
        },
        {
          label: 'Settings',
          path: 'settings',
        },
      ];
    });
  }
}
