import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService, UserService, UserTokenData } from '../../services';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UserService);

  const redirect = (userData: UserTokenData): boolean | UrlTree => {
    const isAdmin = userData.is_admin;
    if (!isAdmin) {
      return router.parseUrl('/home/dashboard');
    }
    return true;
  };

  if (!authService.userSignedIn()) {
    return router.parseUrl('/login');
  }

  if (authService.currentUserData) {
    return redirect(authService.currentUserData);
  }

  return userService.validateToken()
    .then(userData => redirect(userData))
    .catch(() => router.parseUrl('/login'));
};
