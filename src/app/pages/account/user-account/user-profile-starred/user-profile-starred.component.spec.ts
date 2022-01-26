import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileStarredComponent } from './user-profile-starred.component';
import { AccountComponent } from '../../account.component';
import { UserAccountComponent } from '../../user-account/user-account.component';
import { OrgAccountComponent } from '../../org-account/org-account.component';
import { UserProfileBarComponent } from '../../user-account/user-profile-bar/user-profile-bar.component';
import { UserProfileOverviewComponent } from '../../user-account/user-profile-overview/user-profile-overview.component';
import { UserProfileChallengesComponent } from '../../user-account/user-profile-challenges/user-profile-challenges.component';
import { AvatarModule } from '@sage-bionetworks/sage-angular/src/lib/avatar';
import { OrgHeaderModule } from '../../org-account/org-header/org-header.module';
import { OrgOverviewComponent } from '../../org-account/org-overview/org-overview.component';
import { OrgCardModule } from '@shared/cards/org-card/org-card.module';
import { ChallengeCardModule } from '@app/shared/cards/challenge-card/challenge-card.module';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { NotFoundModule } from '@shared/not-found/not-found.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserProfileStarredComponent', () => {
  let component: UserProfileStarredComponent;
  let fixture: ComponentFixture<UserProfileStarredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChallengeCardModule,
        FooterModule,
        OrgHeaderModule,
        AvatarModule,
        OrgCardModule,
        NotFoundModule,
        MaterialModule,
        RouterTestingModule,
      ],
      declarations: [
        AccountComponent,
        UserAccountComponent,
        OrgAccountComponent,
        UserProfileBarComponent,
        UserProfileOverviewComponent,
        UserProfileChallengesComponent,
        OrgOverviewComponent,
        UserProfileStarredComponent,
      ],
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
