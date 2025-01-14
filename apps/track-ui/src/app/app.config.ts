import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideNgxErrorsConfig } from '@ngspot/ngx-errors';
import { primeNgConfig } from '@tracker/core/configs';
import { provideHttpClient } from '@angular/common/http';
import { storeConfig } from './configs/store';
import { MessageService } from 'primeng/api';
import interceptors from './configs/interceptors';

const rootServices = [MessageService];

export const appConfig: ApplicationConfig = {
  providers: [
    ...rootServices,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(interceptors()),
    provideRouter(appRoutes),
    provideNgxErrorsConfig({
      showErrorsWhenInput: 'dirty',
      showMaxErrors: 1,
    }),
    primeNgConfig(),
    storeConfig(),
  ],
};
