import { LoginRequest } from '@tracker/apps/track-ui/models';
import { HttpErrorResponse } from '@angular/common/http';

export class LoginAction {
  static readonly type = '[Auth] Login';

  constructor(public body: LoginRequest) {}
}

export class LoginSuccessAction {
  static readonly type = '[Auth] Login Success';

  constructor(public isRemember: boolean) {}
}

export class LoginFailureAction {
  static readonly type = '[Auth] Login Failure';

  constructor(public error: HttpErrorResponse) {}
}

export class LogoutAction {
  static readonly type = '[Auth] Logout';
}

export class LogoutSuccessAction {
  static readonly type = '[Auth] Logout Success';
}

export class LogoutFailureAction {
  static readonly type = '[Auth] Logout Failure';

  constructor(public error: HttpErrorResponse) {}
}
