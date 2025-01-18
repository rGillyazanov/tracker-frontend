import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { Password } from 'primeng/password';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { EmailPattern } from '@tracker/utils/validations';
import { NGX_ERRORS_DECLARATIONS } from '@ngspot/ngx-errors';
import { Store } from '@ngxs/store';
import { LoginAction } from '@tracker/apps/track-ui/stores';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface LoginFormValue {
  email: string;
  password: string;
  remember: boolean;
}

@Component({
  selector: 'auth-login-form',
  standalone: true,
  imports: [
    InputText,
    Checkbox,
    Password,
    ReactiveFormsModule,
    NgOptimizedImage,
    Button,
    RouterLink,
    Message,
    NGX_ERRORS_DECLARATIONS,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _store = inject(Store);

  submitLoading = signal<boolean>(false);

  formGroup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(EmailPattern)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    remember: new FormControl(false, { nonNullable: true }),
  });

  login(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.submitLoading.set(true);

    const request = this.formGroup.value as LoginFormValue;

    this._store
      .dispatch(new LoginAction(request))
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.submitLoading.set(false);
        },
        error: () => {
          this.submitLoading.set(false);
        },
      });
  }
}
