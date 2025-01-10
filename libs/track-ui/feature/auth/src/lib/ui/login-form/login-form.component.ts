import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { Password } from 'primeng/password';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { EmailPattern } from '@tracker/validations';
import { NGX_ERRORS_DECLARATIONS } from '@ngspot/ngx-errors';
import { AuthApiService, AuthService } from '@tracker/services';

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

  formGroup = new UntypedFormGroup({
    email: new UntypedFormControl(null, [
      Validators.required,
      Validators.pattern(EmailPattern),
    ]),
    password: new UntypedFormControl(null, [Validators.required]),
    remember: new UntypedFormControl(false),
  });

  login(): void {
    const request = this.formGroup.value;

    this._authApiService.login(request).subscribe(() => {
      this._authService.logIn();
    });
  }
}
