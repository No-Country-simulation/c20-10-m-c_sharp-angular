import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
    <div class="container-app p-5">
      <router-outlet></router-outlet>
    </div>
    <app-landing-footer />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingLayoutComponent {}
