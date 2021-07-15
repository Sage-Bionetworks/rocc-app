import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sage-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input()
  version = '1.0.0';

  constructor() {}

  ngOnInit(): void {}
}
