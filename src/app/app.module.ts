import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './trackstar/login/login.component';
import { DeliveriesComponent } from './trackstar/deliveries/deliveries.component';
import { AdminDeliveriesComponent } from './trackstar/admin/deliveries/deliveries.component';
import { CourierDeliveriesComponent } from './trackstar/courier/deliveries/deliveries.component';
import { InternalNavComponent } from './navigation/internal-nav/internal-nav.component';
import { AdminNavComponent } from './navigation/admin-nav/admin-nav.component';
import { CourierNavComponent } from './navigation/courier-nav/courier-nav.component';
import { ExtNavComponent } from './navigation/ext-nav/ext-nav.component';
import { PublicRegistrationComponent } from './trackstar/public-registration/public-registration.component';
import { CourierLoginComponent } from './trackstar/courier-login/courier-login.component';


@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    LoginComponent,
    DeliveriesComponent,
    InternalNavComponent,
    AdminDeliveriesComponent,
    AdminNavComponent,
    CourierNavComponent,
    CourierDeliveriesComponent,
    ExtNavComponent,
    PublicRegistrationComponent,
    CourierLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
