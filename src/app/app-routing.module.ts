import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './trackstar/login/login.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
