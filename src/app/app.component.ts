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

@Component({
  selector: 'rocc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'ROCC';
  sections: { [key: string]: Section } = SECTIONS;
  appVersion = 'x.y.z';
  seedDatabase = false;
  userAvatar: Avatar = MOCK_AVATAR_32;
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

  constructor(
    private router: Router,
    private appConfigService: AppConfigService
  ) {
    this.appConfigService.getAppConfig().subscribe((config) => {
      this.appVersion = config.appVersion;
      this.seedDatabase = config.seedDatabase;
    });
  }

  selectUserMenuItem(menuItem: MenuItem): void {
    console.log('Navbar user menu item selected', menuItem);
  }

  clickNotificationButton(): void {
    this.router.navigate(['notifications']);
  }
}
