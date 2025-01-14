import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { NgOptimizedImage } from '@angular/common';
import { Password } from 'primeng/password';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  EmailPattern,
  matchValidator,
  PasswordPattern,
} from '@tracker/utils/validations';
import { NGX_ERRORS_DECLARATIONS } from '@ngspot/ngx-errors';
import { Message } from 'primeng/message';
import { AuthApiService } from '@tracker/core/services';

@Component({
  selector: 'auth-register-form',
  standalone: true,
  imports: [
    Button,
    InputText,
    NgOptimizedImage,
    Password,
    ReactiveFormsModule,
    RouterLink,
    Message,
    NGX_ERRORS_DECLARATIONS,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthApiService],
})
export class RegisterFormComponent {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);

  formGroup = new UntypedFormGroup(
    {
      name: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.pattern(EmailPattern),
      ]),
      password: new UntypedFormControl(null, [
        Validators.required,
        Validators.pattern(PasswordPattern),
      ]),
      password_confirmation: new UntypedFormControl(null, [
        Validators.required,
      ]),
    },
    { validators: matchValidator('password', 'password_confirmation') },
  );

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const request = this.formGroup.value;

    this._authApiService.register(request).subscribe(() => {
      this._router.navigate(['/auth/login']);
    });
  }
}
