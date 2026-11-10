import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services';

export const isntSignedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const canViewRoute = !authService.userSignedIn();

  if (!canViewRoute) {
    router.navigateByUrl('/home/dashboard');
  }

  return canViewRoute;
};
