import { Component, OnInit } from '@angular/core';
import { Organization } from '@sage-bionetworks/rocc-client-angular';
import { OrgDataService } from '../org-data.service';

@Component({
  selector: 'rocc-org-people',
  templateUrl: './org-people.component.html',
  styleUrls: ['./org-people.component.scss'],
})
export class OrgPeopleComponent implements OnInit {
  org!: Organization | undefined;

  constructor(private orgDataService: OrgDataService) {}

  ngOnInit(): void {
    this.orgDataService.getOrg().subscribe((org) => {
      this.org = org;
    });
  }
}
