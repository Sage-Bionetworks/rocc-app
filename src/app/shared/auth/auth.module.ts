import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './token.service';
import { AuthService } from 'rocc-client-angular/dist/rocc-client';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [TokenService, AuthService],
})
export class AuthModule {}
