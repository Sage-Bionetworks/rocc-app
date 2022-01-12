import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPeopleComponent } from './org-people.component';
import { UserCardModule } from '@shared/cards/user-card/user-card.module';

describe('OrgPeopleComponent', () => {
  let component: OrgPeopleComponent;
  let fixture: ComponentFixture<OrgPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardModule],
      declarations: [OrgPeopleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
