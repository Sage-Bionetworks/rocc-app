import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// TODO: fix import from @sage-bionetworks/sage-angular
import { Section, MenuItem, Avatar, MOCK_AVATAR_32 } from '@sage-bionetworks/sage-angular';
import { AppConfigService } from './app-config.service';
import { SECTIONS } from './app-sections';
// import { environment } from '../environments/environment';

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
  avatar: Avatar = MOCK_AVATAR_32;
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

  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.getAppConfig().subscribe((config) => {
      this.appVersion = config.appVersion;
      this.seedDatabase = config.seedDatabase;
    });
  }

  selectUserMenuItem(menuItem: MenuItem): void {
    console.log('Navbar user menu item selected', menuItem);
  }
}
