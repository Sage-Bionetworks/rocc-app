import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountComponent } from './user-account.component';
import { UserProfileBarComponent } from './user-profile-bar/user-profile-bar.component';
import { UserProfileOverviewComponent } from './user-profile-overview/user-profile-overview.component';
import { UserProfileChallengesComponent } from './user-profile-challenges/user-profile-challenges.component';
import { UserProfileStarredComponent } from './user-profile-starred/user-profile-starred.component';
import { MaterialModule } from '@shared/material/material.module';

describe('UserAccountComponent', () => {
  let component: UserAccountComponent;
  let fixture: ComponentFixture<UserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [
        UserAccountComponent,
        UserProfileBarComponent,
        UserProfileOverviewComponent,
        UserProfileChallengesComponent,
        UserProfileStarredComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
