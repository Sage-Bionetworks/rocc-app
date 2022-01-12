import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgHeaderComponent } from './org-header.component';
import { MaterialModule } from '@shared/material/material.module';

describe('OrgHeaderComponent', () => {
  let component: OrgHeaderComponent;
  let fixture: ComponentFixture<OrgHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [OrgHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
