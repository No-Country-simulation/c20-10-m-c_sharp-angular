import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { LandingFooterComponent } from '../landing-footer/landing-footer.component';
import { LandingHeaderComponent } from '../landing-header/landing-header.component';
import { LandingMenuComponent } from '../landing-menu/landing-menu.component';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LandingFooterComponent,
    LandingHeaderComponent,
    LandingMenuComponent,
  ],
  template: `
    <app-landing-header />
    @defer {
      <app-landing-menu />
    }
    <router-outlet></router-outlet>

    <app-landing-footer *ngIf="showFooter"></app-landing-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingLayoutComponent {
  public showFooter = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showFooter = !event.url.includes('/dashboard');
      });
  }
}
