import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeSearchComponent } from './challenge-search.component';
import { MaterialModule } from '@shared/material/material.module';
import { FiltersModule } from '@shared/filters/filters.module';
import { ChallengeCardModule } from '@app/shared/cards/challenge-card/challenge-card.module';

describe('ChallengeSearchComponent', () => {
  let component: ChallengeSearchComponent;
  let fixture: ComponentFixture<ChallengeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, FiltersModule, ChallengeCardModule],
      declarations: [ChallengeSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
