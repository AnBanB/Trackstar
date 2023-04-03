import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './trackstar/login/login.component';
import { DeliveriesComponent } from './trackstar/deliveries/deliveries.component';
import { InternalNavComponent } from './navigation/internal-nav/internal-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    LoginComponent,
    DeliveriesComponent,
    InternalNavComponent
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
