import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LandingFooterComponent } from '../landing-footer/landing-footer.component';
import { LandingHeaderComponent } from '../landing-header/landing-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LandingFooterComponent, LandingHeaderComponent],
  template: `
    <app-landing-header />
    <div class="container-app c-min-h px-4">
      <router-outlet></router-outlet>
    </div>
    <!-- <app-landing-footer /> -->
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingLayoutComponent {}
