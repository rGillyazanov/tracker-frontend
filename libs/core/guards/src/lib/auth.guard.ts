import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@tracker/core/services';

export const authGuardFn: CanActivateFn = () => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();
  const router = inject(Router);

  if (isLoggedIn) {
    return true;
  } else {
    return router.parseUrl('auth/login');
  }
};
