import { Component, Input } from '@angular/core';
import { User } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-user-profile-overview',
  templateUrl: './user-profile-overview.component.html',
  styleUrls: ['./user-profile-overview.component.scss'],
})
export class UserProfileOverviewComponent {
  @Input() user!: User;

  constructor() {}
}
