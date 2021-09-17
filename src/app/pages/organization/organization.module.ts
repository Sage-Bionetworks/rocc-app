import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { OrganizationComponent } from './organization.component';
import { OrgChallengesComponent } from './org-challenges/org-challenges.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { NotFoundModule } from '@app/shared/not-found/not-found.module';
import { OrgHeaderModule } from '../account/org-account/org-header/org-header.module';
import { OrgPeopleComponent } from './org-people/org-people.component';
import { OrgSettingsComponent } from './org-settings/org-settings.component';
import { OrgNewModule } from './org-new/org-new.module';
import { CardPreviewModule } from '@app/shared/card-preview/card-preview.module';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    MaterialModule,
    NotFoundModule,
    OrgHeaderModule,
    OrganizationRoutingModule,
    OrgNewModule,
    CardPreviewModule,
  ],
  declarations: [
    OrganizationComponent,
    OrgChallengesComponent,
    OrgPeopleComponent,
    OrgSettingsComponent,
  ],
})
export class OrganizationModule {}
