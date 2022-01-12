import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileStarredComponent } from './user-profile-starred.component';
import { ChallengeCardModule } from '@app/shared/cards/challenge-card/challenge-card.module';

describe('UserProfileStarredComponent', () => {
  let component: UserProfileStarredComponent;
  let fixture: ComponentFixture<UserProfileStarredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeCardModule],
      declarations: [UserProfileStarredComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileStarredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
