import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './trackstar/login/login.component';
import { DeliveriesComponent } from './trackstar/deliveries/deliveries.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'trackstar/login',
    component: LoginComponent
  },
  {
    path: 'trackstar/deliveries',
    component: DeliveriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
