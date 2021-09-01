import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { MaterialModule } from '@shared/material/material.module';
import { AccountComponent } from './account.component';

const routes: Routes = [{ path: '', component: AccountComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FooterModule,
    MaterialModule,
  ],
  declarations: [AccountComponent],
})
export class AccountModule {}
