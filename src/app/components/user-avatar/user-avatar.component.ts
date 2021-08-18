import { Component, Input, OnInit } from '@angular/core';
import { EMPTY_USER } from 'src/app/mock-user';
import { User } from './user';

@Component({
  selector: 'sage-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() name = '';
  @Input() avatarUrl = '';
  @Input() size = 40;

  constructor() {}
}
