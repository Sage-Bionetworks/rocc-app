import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  UserService,
  User,
  Organization,
} from '@sage-bionetworks/rocc-client-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Tab {
  name: string;
  visible: boolean;
}

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

  links = ['overview', 'challenges'];

  // tabs =
  tabKeys: string[] = [];

  tab$!: Observable<string | null>;

  tabs: { [key: string]: Tab } = {
    overview: {
      name: 'Overview',
      visible: true,
    },
    challenges: {
      name: 'Challenges',
      visible: true,
    },
    starred: {
      name: 'Starred',
      visible: false,
    },
  };

  activeTab: Tab;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.tabKeys = Object.keys(this.tabs);
    this.activeTab = this.tabs['overview'];
  }

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
