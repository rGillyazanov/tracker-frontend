import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  formGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(EmailPattern),
    ]),
    password: new FormControl(null, [Validators.required]),
    remember: new FormControl(false),
  });

  login(): void {
    console.log(this.formGroup.value);
  }
}
