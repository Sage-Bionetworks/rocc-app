import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'rocc-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() { }

  ngOnInit(): void {
  }

}
