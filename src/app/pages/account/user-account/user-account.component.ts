import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  UserService,
  User,
  Organization,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rocc-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit, OnDestroy {
  @Input() accountId!: string;
  user$!: Observable<User>;
  orgs: Organization[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.accountId);

    const orgsSub = this.userService
      .listUserOrganizations(this.accountId)
      .pipe(map((page) => page.organizations))
      .subscribe((orgs) => (this.orgs = orgs));
    this.subscriptions.push(orgsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
