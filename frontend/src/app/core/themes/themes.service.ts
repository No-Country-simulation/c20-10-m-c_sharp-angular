import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { inject, Injectable, signal } from '@angular/core';

import { environment } from '../../../environments/environment';
import { THEMES_LIST } from './themes-list';
import { Theme, ThemeMode } from './themes.interface';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private readonly cookieService = inject(CookieService);
  private readonly themeCookieKey = environment.COOKIES.USER_THEME;

  /**
   * List of available themes
   */
  public readonly themesList = THEMES_LIST;

  private readonly cookieOptions: CookieOptions = {
    path: '/',
    secure: true,
    sameSite: 'Strict',
  };

  /**
   * Current theme state, including name, color, and mode
   */
  public currentTheme = signal<Theme>({
    name: 'lara',
    color: 'blue',
    mode: 'dark',
  });

  constructor() {
    const cookieTheme = this.getCookieTheme();
    if (cookieTheme) {
      const [name, mode, color] = cookieTheme.split('-');
      this.currentTheme.set({ name, color, mode: mode as 'dark' | 'light' });
    } else {
      this.detectBrowserTheme();
    }

    this.applyTheme();
    this.listenToBrowserThemeChanges();
  }

  /**
   * Sets the current theme mode (dark or light).
   * @param mode - The theme mode to set ('dark' or 'light').
   */
  public setThemeMode(mode: ThemeMode): void {
    // Check if the mode is already the current mode
    if (this.currentTheme().mode === mode) {
      return;
    }

    this.currentTheme.update(theme => ({ ...theme, mode }));
    this.applyTheme();
  }

  /**
   * Sets the current theme's name and color.
   * @param name - The name of the theme.
   * @param color - The color variant of the theme.
   */
  public setTheme(name: string, color: string): void {
    // Check if the theme name and color are already the current ones
    if (this.currentTheme().name === name && this.currentTheme().color === color) {
      return;
    }

    this.currentTheme.update(theme => ({ ...theme, name, color }));
    this.applyTheme();
  }

  /**
   * Retrieves the user's theme from cookies.
   * @returns The user's theme stored in the cookie or an empty string if not found.
   */
  private getCookieTheme(): string {
    try {
      return this.cookieService.get(this.themeCookieKey);
    } catch (error) {
      console.warn('Error getting theme from cookies:', error);
      return '';
    }
  }

  /**
   * Stores the user's theme in cookies.
   * @param theme - The theme string to store in the cookie.
   */
  private setCookieTheme(theme: string): void {
    try {
      this.cookieService.set(this.themeCookieKey, theme, this.cookieOptions);
    } catch (error) {
      console.warn('Error setting theme in cookies:', error);
    }
  }

  /**
   * Detects the user's preferred theme mode based on browser settings.
   */
  private detectBrowserTheme(): void {
    const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    const mode = darkModeMatcher.matches ? 'dark' : 'light';
    this.currentTheme.update(theme => ({ ...theme, mode }));
  }

  /**
   * Listens for changes in the browser's theme preference and updates the theme mode accordingly.
   */
  private listenToBrowserThemeChanges(): void {
    const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMatcher.addEventListener('change', event => {
      const mode = event.matches ? 'dark' : 'light';
      this.setThemeMode(mode);
    });
  }

  /**
   * Applies the current theme by setting the appropriate stylesheet and storing the theme in cookies.
   */
  private applyTheme(): void {
    const themeLink = document.getElementById('app-themes') as HTMLLinkElement;
    const theme = `${this.currentTheme().name}-${this.currentTheme().mode}-${this.currentTheme().color}`;
    this.setCookieTheme(theme);
    if (themeLink) {
      themeLink.href = `${theme}.css`;
    }
  }
}
