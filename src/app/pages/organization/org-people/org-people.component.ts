import { Component, OnInit } from '@angular/core';
import { Organization, User } from '@sage-bionetworks/rocc-client-angular';
import { OrgDataService } from '../org-data.service';

@Component({
  selector: 'rocc-org-people',
  templateUrl: './org-people.component.html',
  styleUrls: ['./org-people.component.scss'],
})
export class OrgPeopleComponent implements OnInit {
  org!: Organization | undefined;
  user: User = {
    id: '',
    email: 'awesome-user@example.org',
    login: 'awesome-user',
    name: 'Awesome User',
    bio: 'A great bio',
    type: 'active',
    createdAt: '',
    updatedAt: '',
  };
  constructor(private orgDataService: OrgDataService) {}

  ngOnInit(): void {
    this.orgDataService.getOrg().subscribe((org) => {
      this.org = org;
    });
  }
}
