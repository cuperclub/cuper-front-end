import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class IsntSignedInGuard  {
  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {

    let userSignedIn = this.authService.userSignedIn();
    let canViewRoute = !userSignedIn;

    if(!canViewRoute){
      this.router.navigateByUrl('/home/dashboard');
    }

    return canViewRoute;
  }
}
