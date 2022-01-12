import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationComponent } from './organization.component';
import { MaterialModule } from '@shared/material/material.module';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { NotFoundModule } from '@app/shared/not-found/not-found.module';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrgHeaderModule } from '../account/org-account/org-header/org-header.module';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FooterModule,
        NotFoundModule,
        OrganizationRoutingModule,
        OrgHeaderModule,
      ],
      declarations: [OrganizationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
