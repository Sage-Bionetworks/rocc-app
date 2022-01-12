import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgNewComponent } from './org-new.component';
import { MaterialModule } from '@shared/material/material.module';
import { FooterModule } from '@sage-bionetworks/sage-angular';

describe('OrgNewComponent', () => {
  let component: OrgNewComponent;
  let fixture: ComponentFixture<OrgNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, FooterModule],
      declarations: [OrgNewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
