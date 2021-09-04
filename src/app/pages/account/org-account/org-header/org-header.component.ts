import { Component, Input } from '@angular/core';
import { Organization } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-org-header',
  templateUrl: './org-header.component.html',
  styleUrls: ['./org-header.component.scss'],
})
export class OrgHeaderComponent {
  @Input() org!: Organization;

  constructor() {}
}
