import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
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

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    AuthComponent,
    SignupComponent,
    SigninComponent,
    NavComponent,
    FooterComponent,
    LandingComponent,
    ProductsComponent,
    UserComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthNullGuard
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
