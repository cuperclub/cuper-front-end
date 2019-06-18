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
    const currentCompany =  currentUser.companies.find(company => company.id == currentUser.current_company_id);
    const isCashier = currentCompany && (currentCompany.role === 'cashier' || currentCompany.role === 'partner') ;
    if(!isCashier){
      this.router.navigateByUrl('/home/dashboard');
    }
    return isCashier;
  }
}
