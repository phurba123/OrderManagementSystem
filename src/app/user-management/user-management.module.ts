import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms'



@NgModule({
  declarations: [SigninComponent, SignupComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class UserManagementModule { }
