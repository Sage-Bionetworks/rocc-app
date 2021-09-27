import { Component, Input, OnInit } from '@angular/core';
import { Organization } from '@sage-bionetworks/rocc-client-angular';

@Component({
  selector: 'rocc-org-card',
  templateUrl: './org-card.component.html',
  styleUrls: ['./org-card.component.scss'],
})
export class OrgCardComponent implements OnInit {
  @Input() org!: Organization;
  constructor() {}

  ngOnInit(): void {}
}
