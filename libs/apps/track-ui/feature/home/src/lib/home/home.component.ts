import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
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
import { LogoutAction } from '@tracker/apps/track-ui/stores';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';

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
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _store = inject(Store);

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

  logoutLoading = signal<boolean>(false);

  logout(): void {
    this.logoutLoading.set(true);

    this._store
      .dispatch(new LogoutAction())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.logoutLoading.set(false);
        },
        error: () => {
          this.logoutLoading.set(false);
        },
      });
  }
}
