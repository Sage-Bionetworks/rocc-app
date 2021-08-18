import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sage-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() name = '';
  @Input() avatarUrl = '';
  @Input() size = 40;

  constructor() {}
}
