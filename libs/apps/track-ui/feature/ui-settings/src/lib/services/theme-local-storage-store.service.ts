import { Injectable } from '@angular/core';

@Injectable()
export class ThemeLocalStorageStoreService {
  private readonly THEME_SETTINGS_KEY = 'themeSettings';

  saveThemeSettings(color: string): void {
    const themeSettings = { color };

    localStorage.setItem(
      this.THEME_SETTINGS_KEY,
      JSON.stringify(themeSettings)
    );
  }

  loadThemeSettings(): { color?: string } | null {
    const savedTheme = localStorage.getItem(this.THEME_SETTINGS_KEY);

    return savedTheme ? JSON.parse(savedTheme) : null;
  }
}
