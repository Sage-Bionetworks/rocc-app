import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Section } from './section';

@Component({
  selector: 'sage-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  title = 'Sage Angular';
  @Input()
  githubUrl = 'https://github.com/Sage-Bionetworks/sage-angular';
  @Input()
  user: unknown = null;
  @Output()
  signIn = new EventEmitter<Event>();
  @Output()
  signUp = new EventEmitter<Event>();
  @Output()
  signOut = new EventEmitter<Event>();

  private _sections: { [key: string]: Section } = {};
  sectionsKeys: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  @Input()
  public set sections(s: { [key: string]: Section }) {
    this._sections = s;
    this.sectionsKeys = Object.keys(s);
  }

  public get sections(): { [key: string]: Section } {
    return this._sections;
  }
}
