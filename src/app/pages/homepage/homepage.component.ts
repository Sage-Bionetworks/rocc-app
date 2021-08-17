import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { AppConfigService } from 'src/app/app-config.service';
import { AppConfig } from 'src/app/app.config';
// import { AppConfigService, AppC } from 'src/app/app-config.service';

@Component({
  selector: 'rocc-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  appConfig!: AppConfig;

  // TODO: remove once login/user is implemented
  @Input()
  user = true;
  username = 'rocc-user';

  constructor(private appConfigService: AppConfigService) {}

  ngOnInit(): void {
    this.appConfigService
      .getAppConfig()
      .subscribe((config) => (this.appConfig = config));
  }
}
