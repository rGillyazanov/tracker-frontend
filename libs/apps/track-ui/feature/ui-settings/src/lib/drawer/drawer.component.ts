import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  ModelSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { NgOptimizedImage } from '@angular/common';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ThemeManagerService } from '../services/theme-manager.service';
import { UiSettingsService } from '../services/ui-settings.service';
import { ThemeLocalStorageStoreService } from '../services/theme-local-storage-store.service';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'lib-ui-settings-drawer',
  imports: [
    DrawerModule,
    ButtonModule,
    NgOptimizedImage,
    Select,
    FormsModule,
    FloatLabel,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ThemeLocalStorageStoreService,
    ThemeManagerService,
    UiSettingsService,
  ],
})
export class DrawerComponent implements OnInit {
  visible: WritableSignal<boolean> = signal<boolean>(false);

  selectedColor: ModelSignal<string> = model<string>('indigo');

  colors: Signal<string[]> = computed<string[]>(
    () => this._themeManagerService.colors
  );

  colorTranslationsMapper = computed<Record<string, string>>(
    () => this._themeManagerService.colorTranslationsMapper
  );

  colorBackgroundClasses = computed<Record<string, string>>(
    () => this._themeManagerService.colorBackgroundClassMapper
  );

  colorSelectedBackgroundClass = computed<string>(
    () => this.colorBackgroundClasses()[this.selectedColor()]
  );

  private readonly _themeManagerService = inject(ThemeManagerService);

  applySettings(): void {
    try {
      this._themeManagerService.applySettings(this.selectedColor());
      this.visible.set(false);
    } catch (e) {
      console.error(e);
    }
  }

  ngOnInit(): void {
    this.selectedColor.set(this._themeManagerService.selectedColor.value);
  }
}
