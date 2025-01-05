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
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  formGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirm_password: new FormControl(null, [Validators.required]),
  });

  submit(): void {
    console.log(this.formGroup.value);
  }
}
