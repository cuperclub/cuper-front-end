import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services';
import { AngularTokenService } from 'angular-token';

@Injectable({
  providedIn: 'root'
})
export class CashierGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: AngularTokenService,
    private userService: UserService
  ) { }

  canActivate(): boolean | Promise<boolean> {
    const userSignedIn = this.tokenService.userSignedIn();
    if(userSignedIn) {
      if(this.tokenService.currentUserData) {
        return this.redirect();
      } else {
        return this.userService.validateToken()
          .then(() => this.redirect())
          .catch(() => false);
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  redirect() {
    const isCashier = this.userService.userIsCashier();
    if(!isCashier){
      this.router.navigateByUrl('/home/dashboard');
    }
    return isCashier;
  }
}
