import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserService } from '../../services';

export const cashierGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UserService);

  const redirect = (): boolean => {
    const isCashier = userService.userIsCashier();
    if (!isCashier) {
      router.navigateByUrl('/home/dashboard');
    }
    return isCashier;
  };

  if (!authService.userSignedIn()) {
    router.navigateByUrl('/login');
    return false;
  }

  if (authService.currentUserData) {
    return redirect();
  }

  return userService.validateToken()
    .then(() => redirect())
    .catch(() => false);
};
