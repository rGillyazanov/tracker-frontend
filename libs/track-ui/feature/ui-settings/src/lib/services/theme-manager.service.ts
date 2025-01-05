import { Injectable } from '@angular/core';
import { UiSettingsService } from './ui-settings.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { ThemeLocalStorageStoreService } from './theme-local-storage-store.service';

@Injectable()
export class ThemeManagerService {
  selectedColor: BehaviorSubject<string> = new BehaviorSubject<string>(
    'indigo'
  );

  readonly colors: string[] = [
    'emerald',
    'green',
    'lime',
    'red',
    'orange',
    'amber',
    'yellow',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
  ];

  readonly colorTranslationsMapper: Record<string, string> = {
    emerald: 'Изумрудный',
    green: 'Зеленый',
    lime: 'Лаймовый',
    red: 'Красный',
    orange: 'Оранжевый',
    amber: 'Янтарный',
    yellow: 'Желтый',
    teal: 'Бирюзовый',
    cyan: 'Голубой',
    sky: 'Небесный',
    blue: 'Голубой',
    indigo: 'Индиго',
    violet: 'Фиолетовый',
    purple: 'Пурпурный',
    fuchsia: 'Фуксия',
    pink: 'Розовый',
    rose: 'Роза',
    slate: 'Сланец',
    gray: 'Серый',
    zinc: 'Цинк',
    neutral: 'Нейтральный',
    stone: 'Камень',
  };

  readonly colorBackgroundClassMapper: Record<string, string> = {
    emerald: 'bg-emerald-500',
    green: 'bg-green-500',
    lime: 'bg-lime-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
    yellow: 'bg-yellow-500',
    teal: 'bg-teal-500',
    cyan: 'bg-cyan-500',
    sky: 'bg-sky-500',
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    violet: 'bg-violet-500',
    purple: 'bg-purple-500',
    fuchsia: 'bg-fuchsia-500',
    pink: 'bg-pink-500',
    rose: 'bg-rose-500',
    slate: 'bg-slate-500',
    gray: 'bg-gray-500',
    zinc: 'bg-zinc-500',
    neutral: 'bg-neutral-500',
    stone: 'bg-stone-500',
  };

  constructor(
    private readonly _uiSettingsService: UiSettingsService,
    private readonly _messageService: MessageService,
    private readonly _themeLocalStorageStoreService: ThemeLocalStorageStoreService
  ) {
    this._loadSavedTheme();
  }

  applySettings(color: string): void {
    if (this.colors.includes(color)) {
      this._setThemeColor(color);
      this._themeLocalStorageStoreService.saveThemeSettings(color);
    } else {
      this._messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Цвет темы не найден',
        life: 5000,
      });

      throw new Error('Цвет темы не найден');
    }
  }

  private _setThemeColor(color: string): void {
    this._uiSettingsService.updateThemeColors(color);

    this._messageService.add({
      severity: 'success',
      summary: 'Успех',
      detail: `Цвет темы успешно изменен на "${this.colorTranslationsMapper[color]}"`,
      life: 5000,
    });
  }

  /**
   * Устанавливает цвет темы по сохраненному значению из localStorage.
   * @private
   */
  private _loadSavedTheme(): void {
    const themeSettings =
      this._themeLocalStorageStoreService.loadThemeSettings();

    if (themeSettings?.color && this.colors.includes(themeSettings.color)) {
      const color = themeSettings.color;

      this.selectedColor.next(color);

      setTimeout(() => {
        this._uiSettingsService.updateThemeColors(color);
      });
    }
  }
}
