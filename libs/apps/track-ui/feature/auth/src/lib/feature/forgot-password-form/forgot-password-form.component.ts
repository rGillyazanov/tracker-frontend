import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NGX_ERRORS_DECLARATIONS } from '@ngspot/ngx-errors';
import { Message } from 'primeng/message';
import { EmailPattern } from '@tracker/utils/validations';

@Component({
  selector: 'auth-forgot-password-form',
  imports: [
    CommonModule,
    Button,
    InputText,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    Message,
    NGX_ERRORS_DECLARATIONS,
  ],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordFormComponent {
  formGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(EmailPattern),
    ]),
  });

  submit(): void {
    console.log(this.formGroup.value);
  }
}
