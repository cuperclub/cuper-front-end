import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.userSignedIn()) {
    router.navigateByUrl('');
    return false;
  }

  if (authService.currentUserData) {
    return true;
  }

  return new Promise<boolean>((resolve, reject) => {
    authService.validateToken().subscribe(
      () => resolve(true),
      () => reject(false)
    );
  });
};
