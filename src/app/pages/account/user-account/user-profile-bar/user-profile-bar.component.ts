import { Component, Input, OnInit } from '@angular/core';
import { User } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-user-profile-bar',
  templateUrl: './user-profile-bar.component.html',
  styleUrls: ['./user-profile-bar.component.scss'],
})
export class UserProfileBarComponent {
  @Input() user!: User;

  constructor() {}
}
