import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideNgxErrorsConfig } from '@ngspot/ngx-errors';
import { primeNgConfig } from '@tracker/prime-ng-config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  authInterceptor,
  credentialsInterceptor,
  sanctumInterceptor,
  xsrfInterceptor,
} from '@tracker/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([
        credentialsInterceptor,
        sanctumInterceptor,
        xsrfInterceptor,
        authInterceptor,
      ]),
    ),
    provideRouter(appRoutes),
    provideNgxErrorsConfig({
      showErrorsWhenInput: 'dirty',
      showMaxErrors: 1,
    }),
    primeNgConfig(),
  ],
};
