import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileOverviewComponent } from './user-profile-overview.component';
import { OrgCardModule } from '@shared/cards/org-card/org-card.module';

describe('UserProfileOverviewComponent', () => {
  let component: UserProfileOverviewComponent;
  let fixture: ComponentFixture<UserProfileOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgCardModule],
      declarations: [UserProfileOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
