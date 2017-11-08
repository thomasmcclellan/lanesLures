import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,  private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let uid = await this.authService.getID();
    // console.log(uid)
    if (uid) {
      return this.authService.isAdminAuthenticated(uid)
    } else if (!uid) {
      this.router.navigate(['home'])
      return false
    }
    
    // return this.authService.isAuthenticated()
  }
}