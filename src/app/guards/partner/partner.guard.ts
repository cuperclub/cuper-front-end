import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserService } from '../../services';

export const partnerGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UserService);

  const redirect = (): boolean => {
    const isPartner = userService.userIsPartner();
    if (!isPartner) {
      router.navigateByUrl('/home/dashboard');
    }
    return isPartner;
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
