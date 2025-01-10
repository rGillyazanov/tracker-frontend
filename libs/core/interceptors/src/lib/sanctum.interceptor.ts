import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthApiService } from '@tracker/services';

let csrfInitialized = false;

export const sanctumInterceptor: HttpInterceptorFn = (req, next) => {
  const authApiService = inject(AuthApiService);

  if (!csrfInitialized && !req.url.endsWith('/sanctum/csrf-cookie')) {
    return authApiService.sanctumCsrfCookie().pipe(
      switchMap(() => {
        csrfInitialized = true;
        return next(req);
      }),
      catchError((error) => {
        if (error.status === 419) {
          csrfInitialized = false;
        }
        return throwError(() => error);
      }),
    );
  }

  return next(req);
};
