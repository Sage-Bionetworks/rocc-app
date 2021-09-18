import { Component, Input, OnInit } from '@angular/core';
import { User } from '@sage-bionetworks/rocc-client-angular';
@Component({
  selector: 'rocc-people-view',
  templateUrl: './people-view.component.html',
  styleUrls: ['./people-view.component.scss'],
})
export class PeopleViewComponent implements OnInit {
  @Input() person!: User;

  constructor() {}

  ngOnInit(): void {}
}
