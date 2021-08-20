import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'src/app/shared/page-title/page-title.service';

@Component({
  selector: 'rocc-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent implements OnInit {
  constructor(private pageTitleService: PageTitleService) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle('Organizations');
  }
}
