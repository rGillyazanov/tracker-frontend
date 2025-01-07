import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideNgxErrorsConfig } from '@ngspot/ngx-errors';
import { primeNgConfig } from '@tracker/prime-ng-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideNgxErrorsConfig({
      showErrorsWhenInput: 'dirty',
      showMaxErrors: 1,
    }),
    primeNgConfig(),
  ],
};
