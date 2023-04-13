import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './trackstar/login/login.component';
import { DeliveriesComponent } from './trackstar/deliveries/deliveries.component';
import { AdminDeliveriesComponent } from './trackstar/admin/deliveries/deliveries.component';
import { CourierDeliveriesComponent } from './trackstar/courier/deliveries/deliveries.component';
import { PublicRegistrationComponent } from './trackstar/public-registration/public-registration.component';
import { CourierLoginComponent } from './trackstar/courier-login/courier-login.component';

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
    path: 'trackstar/courier/login',
    component: CourierLoginComponent
  },
  {
    path: 'trackstar/deliveries',
    component: DeliveriesComponent
  },
  {
    path: 'trackstar/admin/deliveries',
    component: AdminDeliveriesComponent
  },
  {
    path: 'trackstar/courier/deliveries',
    component: CourierDeliveriesComponent
  },
  {
    path: 'trackstar/public/register',
    component: PublicRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
