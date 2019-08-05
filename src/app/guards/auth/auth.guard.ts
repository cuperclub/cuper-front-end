import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: AngularTokenService,
    private router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> | boolean {
      let isAuthenticated = this.tokenService.userSignedIn();
      if(!isAuthenticated){
        this.router.navigateByUrl('');
      }
      const hasUserData = this.tokenService.currentUserData ? true : this.validateToken();
      return hasUserData;
  }

  validateToken() {
    let promise = new Promise((resolve, reject) => {
      this.tokenService.validateToken().subscribe(
        () =>  resolve(true),
        () =>  reject(false)
      )
    });
    return promise;
  }
}
