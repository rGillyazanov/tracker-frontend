import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { NgOptimizedImage } from '@angular/common';
import { Password } from 'primeng/password';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  EmailPattern,
  matchValidator,
  PasswordPattern,
} from '@tracker/validations';
import { NGX_ERRORS_DECLARATIONS } from '@ngspot/ngx-errors';
import { Message } from 'primeng/message';

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
})
export class RegisterFormComponent {
  formGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EmailPattern),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(PasswordPattern),
      ]),
      confirm_password: new FormControl(null, [Validators.required]),
    },
    { validators: matchValidator('password', 'confirm_password') },
  );

  submit(): void {
    console.log(this.formGroup.value);
  }
}
