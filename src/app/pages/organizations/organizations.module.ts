import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from 'src/app/components/material/material.module';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationNewComponent } from './organization-new/organization-new.component';
import { OrganizationViewComponent } from './organization-view/organization-view.component';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    MaterialModule,
    OrganizationsRoutingModule
  ],
  declarations: [
    OrganizationsComponent,
    OrganizationListComponent,
    OrganizationNewComponent,
    OrganizationViewComponent
  ],
  providers: [],
  exports: []
})
export class OrganizationsModule {}
