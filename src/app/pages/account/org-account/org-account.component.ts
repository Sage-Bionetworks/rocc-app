import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Organization,
  OrganizationService,
} from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-org-account',
  templateUrl: './org-account.component.html',
  styleUrls: ['./org-account.component.scss'],
})
export class OrgAccountComponent implements OnInit {
  @Input() accountId!: string;
  org$!: Observable<Organization>;

  sections: any[] = [];

  constructor(private orgService: OrganizationService) {}

  ngOnInit(): void {
    this.org$ = this.orgService.getOrganization(this.accountId);

    this.org$.subscribe((org) => {
      this.sections = [
        {
          label: 'Overview',
          path: '.',
        },
        {
          label: 'Challenges',
          path: `/orgs/${org.login}/challenges`,
        },
        {
          label: 'People',
          path: `/orgs/${org.login}/people`,
        },
        {
          label: 'Settings',
          path: `/orgs/${org.login}/settings`,
        },
      ];
    });
  }
}
