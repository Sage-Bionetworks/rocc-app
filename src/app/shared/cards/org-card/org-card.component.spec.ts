import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCardComponent } from './org-card.component';
import { AvatarModule } from '@sage-bionetworks/sage-angular/src/lib/avatar';
import { MaterialModule } from '@shared/material/material.module';

describe('OrgCardComponent', () => {
  let component: OrgCardComponent;
  let fixture: ComponentFixture<OrgCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarModule, MaterialModule],
      declarations: [OrgCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
