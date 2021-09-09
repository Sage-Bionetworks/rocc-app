import { Component, Input, OnInit } from '@angular/core';
import { User } from '@sage-bionetworks/rocc-client-angular';
import { Avatar } from '@sage-bionetworks/sage-angular/src/lib/avatar';
@Component({
  selector: 'rocc-user-profile-bar',
  templateUrl: './user-profile-bar.component.html',
  styleUrls: ['./user-profile-bar.component.scss'],
})
export class UserProfileBarComponent implements OnInit {
  @Input() user!: User;
  @Input() userAvatar!: Avatar;

  // mock up summary data
  isVerified = true;
  nOrg = 3;
  nFav = 10;

  constructor() {}

  ngOnInit(): void {
    this.userAvatar = {
      name: this.user.name as string,
      src: this.user.avatarUrl as string,
      size: 160,
    };
  }
}
