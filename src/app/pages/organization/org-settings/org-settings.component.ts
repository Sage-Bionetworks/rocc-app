import { Component, OnInit } from '@angular/core';
import { Organization } from '@sage-bionetworks/rocc-client-angular';
import { OrgDataService } from '../org-data.service';

@Component({
  selector: 'rocc-org-settings',
  templateUrl: './org-settings.component.html',
  styleUrls: ['./org-settings.component.scss'],
})
export class OrgSettingsComponent implements OnInit {
  org!: Organization | undefined;

  constructor(private orgDataService: OrgDataService) {}

  ngOnInit(): void {
    this.orgDataService.getOrg().subscribe((org) => {
      this.org = org;
    });
  }
}
