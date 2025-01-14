import { withInterceptors } from '@angular/common/http';
import {
  authInterceptor,
  credentialsInterceptor,
  errorsInterceptor,
  sanctumInterceptor,
  xsrfInterceptor,
} from '@tracker/core/interceptors';

export default () =>
  withInterceptors([
    credentialsInterceptor,
    sanctumInterceptor,
    xsrfInterceptor,
    authInterceptor,
    errorsInterceptor,
  ]);
