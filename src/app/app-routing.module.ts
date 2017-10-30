import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from "./home/checkout/checkout.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { HomeComponent } from "./home/home.component";
import { GuestCheckoutComponent } from "./home/checkout/guest-checkout/guest-checkout.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'checkout/guest-checkout', component: GuestCheckoutComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}