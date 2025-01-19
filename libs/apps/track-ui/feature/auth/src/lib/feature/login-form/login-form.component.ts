import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { Password } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { NGX_ERRORS_DECLARATIONS } from '@ngspot/ngx-errors';
import { LoginFormService } from './services/login-form.service';

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
  providers: [LoginFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnDestroy {
  private readonly _loginFormService = inject(LoginFormService);

  submitLoading = this._loginFormService.submitLoading;

  loginForm = this._loginFormService.loginForm;

  get isInvalidForm(): boolean {
    return this._loginFormService.isInvalidForm;
  }

  login(): void {
    this._loginFormService.login();
  }

  ngOnDestroy(): void {
    this._loginFormService.reset();
  }
}
