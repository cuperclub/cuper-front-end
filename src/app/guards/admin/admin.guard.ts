import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService, UserTokenData } from '../../services';
import { AngularTokenService } from 'angular-token';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: AngularTokenService,
    private userService: UserService
  ) { }

  canActivate(): boolean | Promise<boolean> {
    const userSignedIn = this.tokenService.userSignedIn();
    if(userSignedIn) {
      if(this.tokenService.currentUserData) {
        return this.redirect(this.tokenService.currentUserData);
      } else {
        return this.userService.validateToken().then((userData) => {
          return this.redirect(userData);
        }).catch(() => false);
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  redirect(userData) {
    const currentUser: UserTokenData = userData;
    const isAdmin = currentUser.is_admin;
    if (!isAdmin) {
      this.router.navigateByUrl('/home/dashboard');
    }
    return isAdmin;
  }
}
