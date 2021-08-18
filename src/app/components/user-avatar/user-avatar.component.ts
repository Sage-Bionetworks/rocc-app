import { Component, Input, OnInit } from '@angular/core';
// import { UserProfile } from 'models/auth/user-profile.model';
import { UserProfile } from './user-profile';

@Component({
  selector: 'sage-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() user!: UserProfile;
  @Input() size = 40;

  constructor() {}

  getStyle(): {} {
    return {
      width: `${this.size}px`,
      'min-width': `${this.size}px`,
      height: `${this.size}px`,
      margin: '0 0 0 0',
      'border-radius': '50%',
    };
  }
}
