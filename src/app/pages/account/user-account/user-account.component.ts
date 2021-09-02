import { Component, Input, OnInit } from '@angular/core';
import { UserService, User } from '@sage-bionetworks/rocc-client-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'rocc-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  @Input() userId!: string;
  user$!: Observable<User>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.userId);
  }
}
