import {
  ChangeDetectionStrategy,
  Component,
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
import { EmailPattern } from '@tracker/validations';
import { NGX_ERRORS_DECLARATIONS } from '@ngspot/ngx-errors';
import { AuthApiService, AuthService } from '@tracker/services';
import { HttpErrorResponse } from '@angular/common/http';

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
  private readonly _authApiService = inject(AuthApiService);
  private readonly _authService = inject(AuthService);

  submitLoading = signal<boolean>(false);
  errorMessage = signal<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

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
    this.submitLoading.set(true);
    this.errorMessage.set({ error: false, message: '' });

    if (this.formGroup.invalid) {
      return;
    }

    const request = this.formGroup.value as LoginFormValue;

    this._authApiService.login(request).subscribe({
      next: () => {
        this.submitLoading.set(false);

        this._authService.logIn(request.remember);
      },
      error: (err: HttpErrorResponse) => {
        this.submitLoading.set(false);

        if (err.status === 429) {
          this.errorMessage.set({
            error: true,
            message:
              'Слишком много попыток входа. Пожалуйста, попробуйте ещё раз позже.',
          });
        } else if (err.error?.message) {
          this.errorMessage.set({
            error: true,
            message: err.error.message,
          });
        }
      },
    });
  }
}
