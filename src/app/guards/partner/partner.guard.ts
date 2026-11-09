import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class PartnerGuard  {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  canActivate(): boolean | Promise<boolean> {
    const userSignedIn = this.authService.userSignedIn();
    if(userSignedIn) {
      if(this.authService.currentUserData) {
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
    const isPartner = this.userService.userIsPartner();
    if(!isPartner){
      this.router.navigateByUrl('/home/dashboard');
    }
    return isPartner;
  }
}
