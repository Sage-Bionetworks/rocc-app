import { Component, OnInit } from '@angular/core';
import { Organization } from '@sage-bionetworks/rocc-client-angular';
import { OrgDataService } from '../org-data.service';

@Component({
  selector: 'rocc-org-challenges',
  templateUrl: './org-challenges.component.html',
  styleUrls: ['./org-challenges.component.scss'],
})
export class OrgChallengesComponent implements OnInit {
  org!: Organization | undefined;

  constructor(private orgDataService: OrgDataService) {}

  ngOnInit(): void {
    this.orgDataService.getOrg().subscribe((org) => {
      this.org = org;
    });
  }
}
