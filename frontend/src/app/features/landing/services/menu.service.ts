import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public isMenuOpen = signal<boolean>(false);
  public currentIndexExpanded = signal<number | null>(null);

  public toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
    if (!this.isMenuOpen()) {
      this.currentIndexExpanded.set(null);
    }
  }

  public closeMenu(): void {
    this.isMenuOpen.set(false);
    this.currentIndexExpanded.set(null);
  }
}
