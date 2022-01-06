import { Component, Input, OnInit } from '@angular/core';
import { Organization } from '@sage-bionetworks/rocc-client-angular';
import { Avatar } from '@sage-bionetworks/sage-angular';

@Component({
  selector: 'rocc-org-card',
  templateUrl: './org-card.component.html',
  styleUrls: ['./org-card.component.scss'],
})
export class OrgCardComponent implements OnInit {
  @Input() org!: Organization;
  @Input() orgAvatar!: Avatar;

  ngOnInit(): void {
    this.orgAvatar = {
      name: this.org.name
        ? (this.org.name as string)
        : this.org.login.replace(/-/g, ' '),
      src: this.org.avatarUrl!,
      size: 100,
    };
  }
}
