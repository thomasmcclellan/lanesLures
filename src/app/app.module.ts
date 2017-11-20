import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './home/landing/landing.component';
import { ProductsComponent } from './home/products/products.component';
import { UserComponent } from './home/user/user.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AuthNullGuard } from './services/auth-null-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataStorageService } from './services/data-storage.service';
import { GuestCheckoutComponent } from './home/checkout/guest-checkout/guest-checkout.component';
import { NavbarService } from './services/nav.service';
import { CartService } from './services/cart.service';
import { UserCheckoutComponent } from './home/checkout/user-checkout/user-checkout.component';
import { CartComponent } from './home/cart/cart.component';
import { OnlyNumber } from './home/landing/number-validator.directive';
import { AboutComponent } from './home/about/about.component';
import { HelpComponent } from './home/help/help.component';
import { ContactComponent } from './home/contact/contact.component';
import { ContentService } from './services/content.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    AuthComponent,
    SigninComponent,
    NavComponent,
    FooterComponent,
    LandingComponent,
    ProductsComponent,
    UserComponent,
    CheckoutComponent,
    GuestCheckoutComponent,
    UserCheckoutComponent,
    CartComponent,
    OnlyNumber,
    AboutComponent,
    HelpComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthNullGuard,
    DataStorageService,
    NavbarService,
    CartService,
    ContentService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
