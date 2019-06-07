import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class IsCashierGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const currentUser = this.userService.getDataOnLocalStorage();
    const isCashier = currentUser && currentUser.is_cashier
    if(!isCashier){
      this.router.navigateByUrl('/home/dashboard');
    }
    return isCashier;
  }
}