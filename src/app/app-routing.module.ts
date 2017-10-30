import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from "./auth/signin/signin.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},  
  { path: 'signin', component: SigninComponent}
//   { path: 'home', component: HomeComponent, canActivate: [AuthNullGuard || AuthGuard]  },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}