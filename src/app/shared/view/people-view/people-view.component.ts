import { Component, Input, OnInit } from '@angular/core';
import { User } from '@sage-bionetworks/rocc-client-angular';
import { Avatar } from '@sage-bionetworks/sage-angular';

@Component({
  selector: 'rocc-people-view',
  templateUrl: './people-view.component.html',
  styleUrls: ['./people-view.component.scss'],
})
export class PeopleViewComponent implements OnInit {
  @Input() person!: User;
  @Input() userAvatar!: Avatar;

  constructor() {}

  ngOnInit(): void {
    this.userAvatar = {
      name: this.person.name
        ? (this.person.name as string)
        : this.person.login.replace(/-/g, ' '),
      src: this.person.avatarUrl!,
      size: 200,
    };
  }
}
