import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AuthAction } from './auth.actions';

export interface AuthStateModel {
  items: string[];
}

const defaults = {
  items: [],
};

@State<AuthStateModel>({
  name: 'auth',
  defaults,
})
@Injectable()
export class AuthState {
  @Action(AuthAction)
  add(
    { getState, setState }: StateContext<AuthStateModel>,
    { payload }: AuthAction,
  ) {
    const state = getState();
    setState({ items: [...state.items, payload] });
  }
}
