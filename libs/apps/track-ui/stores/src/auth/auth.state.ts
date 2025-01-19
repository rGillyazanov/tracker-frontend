import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import {
  LoginAction,
  LoginFailureAction,
  LoginSuccessAction,
  LogoutAction,
  LogoutFailureAction,
  LogoutSuccessAction,
} from './auth.actions';
import { AuthApiService, AuthService } from '@tracker/core/services';
import { patch } from '@ngxs/store/operators';
import { tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface AuthStateModel {
  isAuth: boolean;
}

const defaults = {
  isAuth: false,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults,
})
@Injectable()
export class AuthState implements NgxsOnInit {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _authService = inject(AuthService);

  ngxsOnInit({ setState }: StateContext<AuthStateModel>): void {
    const isAuth = this._authService.isLoggedIn();

    setState({
      isAuth,
    });
  }

  @Action(LoginAction, { cancelUncompleted: true })
  loginAction(
    { dispatch }: StateContext<AuthStateModel>,
    { body }: LoginAction,
  ) {
    return this._authApiService.login(body).pipe(
      tap({
        next: () => dispatch(new LoginSuccessAction(body.remember)),
        error: (error: HttpErrorResponse) =>
          dispatch(new LoginFailureAction(error)),
      }),
    );
  }

  @Action(LoginSuccessAction)
  loginSuccessAction(
    { setState }: StateContext<AuthStateModel>,
    { isRemember }: LoginSuccessAction,
  ) {
    setState(patch({ isAuth: true }));

    this._authService.logIn(isRemember);
  }

  @Action(LoginFailureAction)
  loginFailureAction(
    _: StateContext<AuthStateModel>,
    { error }: LoginFailureAction,
  ) {
    console.error(error);
  }

  @Action(LogoutAction, { cancelUncompleted: true })
  logoutAction({ dispatch }: StateContext<AuthStateModel>) {
    return this._authApiService.logout().pipe(
      tap({
        next: () => dispatch(new LogoutSuccessAction()),
        error: (error: HttpErrorResponse) =>
          dispatch(new LogoutFailureAction(error)),
      }),
    );
  }

  @Action(LogoutSuccessAction)
  logoutSuccessAction({ setState }: StateContext<AuthStateModel>) {
    this._authService.logOut();

    setState(patch({ isAuth: false }));
  }

  @Action(LogoutFailureAction)
  logoutFailureAction(
    _: StateContext<AuthStateModel>,
    { error }: LogoutFailureAction,
  ) {
    console.error(error);
  }
}
