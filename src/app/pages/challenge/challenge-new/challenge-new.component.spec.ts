import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeNewComponent } from './challenge-new.component';
import { MaterialModule } from '@shared/material/material.module';
import { FooterModule } from '@sage-bionetworks/sage-angular';

describe('ChallengeNewComponent', () => {
  let component: ChallengeNewComponent;
  let fixture: ComponentFixture<ChallengeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, FooterModule],
      declarations: [ChallengeNewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
