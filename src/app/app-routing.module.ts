import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }
//   { path: 'home', component: HomeComponent, canActivate: [AuthNullGuard || AuthGuard]  },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}