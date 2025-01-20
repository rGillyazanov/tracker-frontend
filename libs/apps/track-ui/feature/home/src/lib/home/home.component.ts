import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Button, ButtonDirective, ButtonIcon } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { OverlayBadge } from 'primeng/overlaybadge';
import { LogoutAction } from '@tracker/apps/track-ui/stores';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { Tooltip } from 'primeng/tooltip';
import { AvatarGroup } from 'primeng/avatargroup';
import { Popover } from 'primeng/popover';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

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
    Tooltip,
    AvatarGroup,
    Popover,
    InputGroup,
    InputGroupAddon,
    ButtonDirective,
    ButtonIcon,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _store = inject(Store);

  navsTop = signal<
    {
      label: string;
      icon: string;
      iconColor?: string;
      path: string;
      tooltip?: string;
    }[]
  >([
    { label: 'Главная', icon: PrimeIcons.HOME, path: '/home' },
    {
      label: 'Задачи',
      icon: PrimeIcons.CHECK_CIRCLE,
      path: '/tasks',
    },
    {
      label: 'Напоминания',
      icon: PrimeIcons.CALENDAR,
      path: '/notifications',
      tooltip:
        'Создание событий с уведомлением участника(ов) рабочего пространства.',
    },
  ]);

  navsBottom = signal([
    {
      label: 'Настройки',
      icon: PrimeIcons.COG,
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

  members = [
    {
      name: 'Руслан Гиллязанов',
      image: 'amyelsner.png',
      email: 'r.gillyazanov@corelab.team',
      role: 'Администратор',
    },
    {
      name: 'Артем Лунцов',
      image: 'bernardodominic.png',
      email: 'a.lunzov@corelab.team',
      role: 'Разработчик',
    },
    {
      name: 'Булат Галиуллин',
      image: 'ionibowcher.png',
      email: 'b.galiullin@corelab.team',
      role: 'Менеджер',
    },
  ];

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
