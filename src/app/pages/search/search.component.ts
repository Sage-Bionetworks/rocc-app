import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'rocc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor() { }

  ngOnInit(): void {
  }

}
