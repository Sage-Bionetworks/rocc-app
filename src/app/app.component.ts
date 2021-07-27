import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// TODO: fix import from @sage-bionetworks/sage-angular
import { Section } from '@sage-bionetworks/sage-angular/src/lib/navbar/section';
import { SECTIONS } from './app-sections';
// import { environment } from '../environments/environment';

@Component({
    selector: 'rocc-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'ROCC';
  version = 'x.y.z';  // environment.appVersion;
  sections: { [key: string]: Section } = SECTIONS;
  seedDatabase = false;  // environment.seedDatabase;

  constructor() {}

  ngOnInit(): void {}
}
