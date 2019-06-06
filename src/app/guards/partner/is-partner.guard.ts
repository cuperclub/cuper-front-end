import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsPartnerGuard implements CanActivate {
  constructor(private tokenService: AngularTokenService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    let currentUser = this.tokenService.currentUserData;
    console.log(currentUser);

    return true;
  }
}
