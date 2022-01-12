import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeComponent } from './challenge.component';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { ChallengeRoutingModule } from './challenge-routing.module';
import { NotFoundModule } from '@app/shared/not-found/not-found.module';

describe('ChallengeComponent', () => {
  let component: ChallengeComponent;
  let fixture: ComponentFixture<ChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChallengeRoutingModule,
        FooterModule,
        MaterialModule,
        NotFoundModule,
      ],
      declarations: [ChallengeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
