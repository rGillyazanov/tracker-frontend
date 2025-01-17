import {
  HttpInterceptorFn,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { inject } from '@angular/core';

export const xsrfInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(HttpXsrfTokenExtractor);
  const headerName = 'X-XSRF-TOKEN';

  if (req.method === 'GET' || req.method === 'HEAD') {
    return next(req);
  }

  const token = tokenService.getToken();

  if (token !== null && !req.headers.has(headerName)) {
    req = req.clone({
      headers: req.headers
        .set(headerName, token)
        .set('Accept', 'application/json'),
    });
  }

  return next(req);
};
