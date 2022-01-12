import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { NotFoundModule } from '@shared/not-found/not-found.module';
import { UserAccountComponent } from './user-account/user-account.component';
import { OrgAccountComponent } from './org-account/org-account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterModule, NotFoundModule],
      declarations: [
        AccountComponent,
        UserAccountComponent,
        OrgAccountComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
