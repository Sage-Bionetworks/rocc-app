import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgChallengesComponent } from './org-challenges.component';
import { ChallengeCardModule } from '@app/shared/cards/challenge-card/challenge-card.module';
import { FiltersModule } from '@shared/filters/filters.module';
import { MaterialModule } from '@shared/material/material.module';

describe('OrgChallengesComponent', () => {
  let component: OrgChallengesComponent;
  let fixture: ComponentFixture<OrgChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeCardModule, FiltersModule, MaterialModule],
      declarations: [OrgChallengesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
