import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgOverviewComponent } from './org-overview.component';

describe('OrgOverviewComponent', () => {
  let component: OrgOverviewComponent;
  let fixture: ComponentFixture<OrgOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
