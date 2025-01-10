import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthApiService, AuthService } from '@tracker/services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authApiService = inject(AuthApiService);
  const authService = inject(AuthService);

  if (req.url.includes('/logout')) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authApiService.logout().subscribe({
          next: () => {
            authService.logOut();
          },
          error: (err) => {
            console.error('Ошибка при выходе из системы', err);
          },
        });
      }

      return throwError(() => error);
    }),
  );
};
