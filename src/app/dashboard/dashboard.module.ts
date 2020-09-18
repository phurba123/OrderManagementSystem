import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [HomeComponent, CartComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
