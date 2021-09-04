import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAccountComponent } from './org-account.component';

describe('OrgAccountComponent', () => {
  let component: OrgAccountComponent;
  let fixture: ComponentFixture<OrgAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
