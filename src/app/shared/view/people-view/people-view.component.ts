import { Component, Input, OnInit } from '@angular/core';
import {
  User,
  UserService,
  Organization,
} from '@sage-bionetworks/rocc-client-angular';
import { Avatar } from '@sage-bionetworks/sage-angular';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'rocc-people-view',
  templateUrl: './people-view.component.html',
  styleUrls: ['./people-view.component.scss'],
})
export class PeopleViewComponent implements OnInit {
  @Input() person!: User;
  @Input() userAvatar!: Avatar;
  orgs!: Organization[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userAvatar = {
      name: this.person.name
        ? (this.person.name as string)
        : this.person.login.replace(/-/g, ' '),
      src: this.person.avatarUrl!,
      size: 200,
    };

    this.userService
      .listUserOrganizations(this.person.id)
      .pipe(map((page) => page.organizations))
      .subscribe((orgs) => (this.orgs = orgs));
  }
}
