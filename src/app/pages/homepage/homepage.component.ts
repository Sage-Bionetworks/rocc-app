import { Component, HostBinding, OnInit, Input } from '@angular/core';
import {
  AppEnvironmentService,
  Environment,
} from 'src/app/app-environment.service';

@Component({
  selector: 'rocc-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  environment!: Environment;

  // TODO: remove once login/user is implemented
  @Input()
  user = true;
  username = 'rocc-user';

  constructor(private appEnvironmentService: AppEnvironmentService) {}

  ngOnInit(): void {
    this.appEnvironmentService
      .load()
      .subscribe((environment) => (this.environment = environment));
  }
}
