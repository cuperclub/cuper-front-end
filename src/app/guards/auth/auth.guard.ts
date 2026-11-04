import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> | boolean {
      let isAuthenticated = this.authService.userSignedIn();
      if(!isAuthenticated){
        this.router.navigateByUrl('');
        return false;
      }
      const hasUserData = this.authService.currentUserData ? true : this.validateToken();
      return hasUserData;
  }

  validateToken() {
    let promise = new Promise((resolve, reject) => {
      this.authService.validateToken().subscribe(
        () =>  resolve(true),
        () =>  reject(false)
      )
    });
    return promise;
  }
}
