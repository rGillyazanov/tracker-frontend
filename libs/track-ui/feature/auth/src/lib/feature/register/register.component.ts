import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterFormComponent } from '../../ui/register-form/register-form.component';

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
