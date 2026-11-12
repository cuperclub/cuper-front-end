import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService, UserService } from '../../services';

export const cashierGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UserService);

  const redirect = (): boolean | UrlTree => {
    const isCashier = userService.userIsCashier();
    if (!isCashier) {
      return router.parseUrl('/home/dashboard');
    }
    return true;
  };

  if (!authService.userSignedIn()) {
    return router.parseUrl('/login');
  }

  if (authService.currentUserData) {
    return redirect();
  }

  return userService.validateToken()
    .then(() => redirect())
    .catch(() => router.parseUrl('/login'));
};
