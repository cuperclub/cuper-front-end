import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';

@Injectable({
  providedIn: 'root'
})
export class IsntSignedInGuard implements CanActivate {
  constructor(
    private tokenService: AngularTokenService,
    private router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {

    let userSignedIn = this.tokenService.userSignedIn();
    let canViewRoute = !userSignedIn;

    if(!canViewRoute){
      this.router.navigateByUrl('/home/dashboard');
    }

    return canViewRoute;
  }
}
