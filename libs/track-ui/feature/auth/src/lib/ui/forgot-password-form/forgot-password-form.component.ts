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

@Component({
  selector: 'auth-forgot-password-form',
  imports: [
    CommonModule,
    Button,
    InputText,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordFormComponent {
  formGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
  });

  submit(): void {
    console.log(this.formGroup.value);
  }
}
