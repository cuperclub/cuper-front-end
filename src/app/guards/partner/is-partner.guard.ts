import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class IsPartnerGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const currentUser = this.userService.getDataOnLocalStorage();
    const isPartner = currentUser && currentUser.is_partner
    if(!isPartner){
      this.router.navigateByUrl('/home/dashboard');
    }
    return isPartner;
  }
}
