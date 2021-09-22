import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import { User } from '@sage-bionetworks/rocc-client-angular';
import { AppConfigService } from 'src/app/app-config.service';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from '@shared/auth/auth.service';

@Component({
  selector: 'rocc-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  user!: User | undefined;

  appConfig!: AppConfig;

  // TODO: remove once login/user is implemented
  @Input()
  // user = true;
  username = 'rocc-user';

  constructor(
    private appConfigService: AppConfigService,
    private pageTitleService: PageTitleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.appConfigService
      .getAppConfig()
      .subscribe((config) => (this.appConfig = config));

    this.authService.getUser().subscribe((user) => (this.user = user));

    this.pageTitleService.setTitle('ROCC');
  }
}
