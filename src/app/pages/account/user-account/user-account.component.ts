import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  UserService,
  User,
  Organization,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tab } from './tab.model';
import { TABS } from './user-account-tabs';

@Component({
  selector: 'rocc-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit, OnDestroy {
  @Input() accountId!: string;
  user$!: Observable<User>;
  orgs: Organization[] = [];
  tabs = TABS;
  tabKeys: string[] = Object.keys(this.tabs);
  activeTab: Tab = this.tabs['overview'];
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.accountId);

    const orgsSub = this.userService
      .listUserOrganizations(this.accountId)
      .pipe(map((page) => page.organizations))
      .subscribe((orgs) => (this.orgs = orgs));
    this.subscriptions.push(orgsSub);

    const activeTabSub = this.route.queryParamMap
      .pipe(
        map((params: ParamMap) => params.get('tab')),
        map((key) => (key === null ? 'overview' : key))
      )
      .subscribe((key) => {
        if (!this.tabKeys.includes(key)) {
          this.router.navigate([]);
        } else {
          this.activeTab = this.tabs[key];
        }
      });
    this.subscriptions.push(activeTabSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
