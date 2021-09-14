import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@app/shared/material/material.module';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [CommonModule, FooterModule, MaterialModule, SettingsRoutingModule],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
