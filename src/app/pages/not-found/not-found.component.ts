import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'rocc-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() { }

  ngOnInit(): void {
  }

}
