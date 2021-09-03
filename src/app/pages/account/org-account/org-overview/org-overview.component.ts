import { Component, Input } from '@angular/core';
import { Organization } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-org-overview',
  templateUrl: './org-overview.component.html',
  styleUrls: ['./org-overview.component.scss'],
})
export class OrgOverviewComponent {
  @Input() org!: Organization;

  constructor() {}
}
