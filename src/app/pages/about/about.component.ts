import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { PageTitleService } from '@sage-bionetworks/sage-angular';
import { Registry, RegistryService, User } from '@sage-bionetworks/rocc-client-angular';
import { AppConfigService } from 'src/app/app-config.service';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from '@shared/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rocc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;
  user!: User | undefined;
  registry$!: Observable<Registry>;

  appConfig!: AppConfig;

  // TODO: remove once login/user is implemented
  @Input() username = 'rocc-user';

  constructor(
    private appConfigService: AppConfigService,
    private pageTitleService: PageTitleService,
    private registryService: RegistryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.appConfigService
      .getAppConfig()
      .subscribe((config) => (this.appConfig = config));

    this.registry$ = this.registryService.getRegistry();

    this.authService.getUser().subscribe((user) => (this.user = user));

    this.pageTitleService.setTitle('ROCC - About');
  }
}