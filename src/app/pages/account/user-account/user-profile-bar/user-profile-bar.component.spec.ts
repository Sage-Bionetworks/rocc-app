import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileBarComponent } from './user-profile-bar.component';
import { AvatarModule } from '@sage-bionetworks/sage-angular/src/lib/avatar';
import { MaterialModule } from '@shared/material/material.module';

describe('UserProfileBarComponent', () => {
  let component: UserProfileBarComponent;
  let fixture: ComponentFixture<UserProfileBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarModule, MaterialModule],
      declarations: [UserProfileBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
