import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService, UserTokenData } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  canActivate(): boolean | Promise<boolean> {
    const userSignedIn = this.authService.userSignedIn();
    if(userSignedIn) {
      if(this.authService.currentUserData) {
        return this.redirect(this.authService.currentUserData);
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
