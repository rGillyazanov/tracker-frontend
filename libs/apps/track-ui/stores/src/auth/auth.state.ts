import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import {
  LoginAction,
  LoginFailureAction,
  LoginSuccessAction,
} from './auth.actions';
import { AuthApiService, AuthService } from '@tracker/core/services';
import { patch } from '@ngxs/store/operators';
import { MessageService } from 'primeng/api';
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
  private readonly _messageService = inject(MessageService);

  ngxsOnInit({ setState }: StateContext<AuthStateModel>): void {
    const isAuth = this._authService.isLoggedIn();

    setState({
      isAuth,
    });
  }

  @Action(LoginAction)
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
    let message = '';

    if (error.status === 429) {
      message =
        'Слишком много попыток входа. Пожалуйста, попробуйте ещё раз позже.';
    } else if (error.error?.message) {
      message = error.error.message;
    }

    this._messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: message,
    });
  }
}
