import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeStargazersComponent } from './challenge-stargazers.component';
import { UserCardModule } from '@app/shared/cards/user-card/user-card.module';

describe('ChallengeStargazersComponent', () => {
  let component: ChallengeStargazersComponent;
  let fixture: ComponentFixture<ChallengeStargazersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardModule],
      declarations: [ChallengeStargazersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeStargazersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
