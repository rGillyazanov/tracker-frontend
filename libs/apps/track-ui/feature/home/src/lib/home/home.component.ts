import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { OverlayBadge } from 'primeng/overlaybadge';

@Component({
  selector: 'lib-home',
  imports: [
    CommonModule,
    FormsModule,
    RouterLinkActive,
    RouterLink,
    NgOptimizedImage,
    Avatar,
    IconField,
    InputIcon,
    InputText,
    Button,
    FloatLabel,
    Select,
    OverlayBadge,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  navsTop = signal([
    { label: 'Главная', icon: 'pi pi-home', path: '/home' },
    { label: 'Команда', icon: 'pi pi-users', path: '/team' },
  ]);

  navsBottom = signal([
    {
      label: 'Настройки',
      icon: 'pi pi-cog',
      path: '/settings',
    },
  ]);

  projects = signal([
    {
      name: 'IT-Grad.ru',
    },
    {
      name: 'PetStory',
    },
    {
      name: 'Роснефть',
    },
  ]);
}
