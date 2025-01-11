import { Injectable } from '@angular/core';
import { palette, updatePrimaryPalette } from '@primeng/themes';

@Injectable()
export class UiSettingsService {
  updateThemeColors(color: string): void {
    updatePrimaryPalette(palette(`{${color}}`));
  }
}
