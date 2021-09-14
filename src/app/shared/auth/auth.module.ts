import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './token.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [TokenService],
})
export class AuthModule {}
