import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '@sage-bionetworks/sage-angular';
import { SigninComponent } from './signin.component';
import { MaterialModule } from '@shared/material/material.module';

const routes: Routes = [
  { path: '', component: SigninComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FooterModule,
    MaterialModule,
  ],
  declarations: [SigninComponent],
  exports: [SigninComponent]
})
export class SigninModule {}
