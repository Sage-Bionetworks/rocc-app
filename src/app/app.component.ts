import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Section,
  MenuItem,
  Avatar,
  MOCK_AVATAR_32,
} from '@sage-bionetworks/sage-angular';
import { AuthService } from '@shared/auth/auth.service';
import { AppConfigService } from './app-config.service';
import { SECTIONS } from './app-sections';
import { User } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ROCC';
  sections: { [key: string]: Section } = SECTIONS;
  appVersion = 'x.y.z';
  seedDatabase = false;
  userAvatar: Avatar = MOCK_AVATAR_32;
  signedIn: boolean = false;
  userMenuItems: MenuItem[] = [
    {
      name: 'Profile',
      icon: 'account_circle',
    },
    {
      name: 'Log out',
      icon: 'exit_to_app',
    },
  ];
  user!: User | undefined;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private appConfigService: AppConfigService,
    private authService: AuthService
  ) {
    this.appConfigService.getAppConfig().subscribe((config) => {
      this.appVersion = config.appVersion;
      this.seedDatabase = config.seedDatabase;
    });
  }

  ngOnInit(): void {
    const signedInSub = this.authService
      .isSignedIn()
      .subscribe((signedIn) => (this.signedIn = signedIn));
    this.subscriptions.push(signedInSub);

    const userSub = this.authService.getUser().subscribe((user) => {
      this.user = user;
      if (user) {
        this.userAvatar.name = user.name ? user.name : user.login;
        this.userAvatar.src = user.avatarUrl ? user.avatarUrl : '';
      } else {
        this.userAvatar.name = '';
        this.userAvatar.src = '';
      }
    });
    this.subscriptions.push(userSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  selectUserMenuItem(menuItem: MenuItem): void {
    console.log('Navbar user menu item selected', menuItem);
    // TODO DRY selected item, no not make comparison with string that way
    if (menuItem.name === 'Log out') {
      this.authService.signout();
    } else if (menuItem.name === 'Profile') {
      this.router.navigate([this.user?.login]);
    }
  }

  clickNotificationButton(): void {
    this.router.navigate(['notifications']);
  }
}
