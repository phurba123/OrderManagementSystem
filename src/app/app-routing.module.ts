import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './user-management/signin/signin.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { ForgotPasswordComponent } from './user-management/forgot-password/forgot-password.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CartComponent } from './dashboard/cart/cart.component';
import { ProfileComponent } from './dashboard/profile/profile.component';


const routes: Routes = [
  {path:'signin',component:SigninComponent},
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'signup',component:SignupComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'home',component:HomeComponent},
  {path:'admin/home',component:AdminHomeComponent},
  {path:'cart',component:CartComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
