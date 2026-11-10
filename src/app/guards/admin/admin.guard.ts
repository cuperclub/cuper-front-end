import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserService, UserTokenData } from '../../services';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UserService);

  const redirect = (userData: UserTokenData): boolean => {
    const isAdmin = userData.is_admin;
    if (!isAdmin) {
      router.navigateByUrl('/home/dashboard');
    }
    return isAdmin;
  };

  if (!authService.userSignedIn()) {
    router.navigateByUrl('/login');
    return false;
  }

  if (authService.currentUserData) {
    return redirect(authService.currentUserData);
  }

  return userService.validateToken()
    .then(userData => redirect(userData))
    .catch(() => false);
};
