import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { AppConfigService } from 'src/app/app-config.service';
import { AppConfig } from 'src/app/app.config';
import { PageTitleService } from 'src/app/shared/page-title/page-title.service';
import { User } from 'src/app/user';
// import { AppConfigService, AppC } from 'src/app/app-config.service';
import { USER } from '../../mock-user';

@Component({
  selector: 'rocc-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  user: User = USER;

  appConfig!: AppConfig;

  // TODO: remove once login/user is implemented
  @Input()
  // user = true;
  username = 'rocc-user';

  constructor(private appConfigService: AppConfigService, private pageTitleService: PageTitleService) {}

  ngOnInit(): void {
    this.appConfigService
      .getAppConfig()
      .subscribe((config) => (this.appConfig = config));
    this.pageTitleService.setTitle('ROCC');
  }
}
