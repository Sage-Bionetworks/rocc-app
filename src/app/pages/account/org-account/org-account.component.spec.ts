import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAccountComponent } from './org-account.component';
import { OrgHeaderComponent } from './org-header/org-header.component';
import { OrgOverviewComponent } from './org-overview/org-overview.component';
import { MaterialModule } from '@shared/material/material.module';

describe('OrgAccountComponent', () => {
  let component: OrgAccountComponent;
  let fixture: ComponentFixture<OrgAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [
        OrgAccountComponent,
        OrgHeaderComponent,
        OrgOverviewComponent,
      ],
    }).compileComponents();
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
