import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ForgotPasswordFormComponent } from '../../ui/forgot-password-form/forgot-password-form.component';

@Component({
  selector: 'auth-forgot-password',
  standalone: true,
  imports: [ForgotPasswordFormComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {}
