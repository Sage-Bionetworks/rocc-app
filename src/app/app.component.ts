import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

// TODO: fix import from @sage-bionetworks/sage-angular
import {
  Section,
  MenuItem,
  Avatar,
  MOCK_AVATAR_32,
} from '@sage-bionetworks/sage-angular';
import { AppConfigService } from './app-config.service';
import { SECTIONS } from './app-sections';
import { AuthService } from '@shared/auth/auth.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from 'rocc-client-angular/node_modules/@angular/core/core';

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
      name: 'Sign out',
      icon: 'exit_to_app',
    },
  ];
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectUserMenuItem(menuItem: MenuItem): void {
    console.log('Navbar user menu item selected', menuItem);
  }

  clickNotificationButton(): void {
    this.router.navigate(['notifications']);
  }
}
