import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailPattern } from '@tracker/utils/validations';
import { LoginAction } from '@tracker/apps/track-ui/stores';
import { createDispatchMap } from '@ngxs/store';
import { FormLoginValues } from '../contracts/form-login.interface';

@Injectable()
export class LoginFormService {
  private readonly _actions = createDispatchMap({
    login: LoginAction,
  });

  submitLoading = signal<boolean>(false);

  private readonly _formGroup = new FormGroup({
    email: new FormControl('admin@corelab.team', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(EmailPattern)],
    }),
    password: new FormControl('12345678test', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    remember: new FormControl(false, { nonNullable: true }),
  });

  get isInvalidForm(): boolean {
    return this._formGroup.invalid;
  }

  get loginForm(): FormGroup {
    return this._formGroup;
  }

  login(): void {
    if (this._formGroup.invalid) {
      return;
    }

    this.submitLoading.set(true);

    const request = this._formGroup.value as FormLoginValues;

    this._actions.login(request).subscribe({
      next: () => {
        this.submitLoading.set(false);
      },
      error: () => {
        this.submitLoading.set(false);
      },
    });
  }

  reset(): void {
    this._formGroup.reset();
    this.submitLoading.set(false);
  }
}
