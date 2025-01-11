import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from '../../ui/login-form/login-form.component';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
