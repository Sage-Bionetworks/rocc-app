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

  constructor(private orgService: OrganizationService) {}

  ngOnInit(): void {
    this.org$ = this.orgService.getOrganization(this.accountId);
  }
}
