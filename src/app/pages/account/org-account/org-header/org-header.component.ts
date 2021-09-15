import { Component, Input } from '@angular/core';
import { Organization } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-org-header',
  templateUrl: './org-header.component.html',
  styleUrls: ['./org-header.component.scss'],
})
export class OrgHeaderComponent {
  @Input() org!: Organization;
  // mock data
  tmpOrg = {
    id: '613931c6bef3ffc6e5091e4b',
    email: 'contact@example.org',
    login: 'sage-bionetworks',
    name: 'Sage Bionetworks',
    avatarUrl: 'assets/img/logo/sage-bionetworks.png',
  };

  constructor() {}
}
