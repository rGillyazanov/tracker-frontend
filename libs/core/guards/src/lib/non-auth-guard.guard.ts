import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@tracker/services';

export const nonAuthGuardFn: CanActivateFn = () => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();
  const router = inject(Router);

  if (isLoggedIn) {
    return router.parseUrl('home');
  }

  return true;
};
