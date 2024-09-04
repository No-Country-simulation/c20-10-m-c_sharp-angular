import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { LandingHeaderComponent } from '../../layout/landing-header/landing-header.component';
import { LandingFooterComponent } from '../../layout/landing-footer/landing-footer.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LandingHeaderComponent,
    ButtonModule,
    LandingFooterComponent,
    SearchbarComponent,
  ],
  template: `
    <div class="container-c">
      <div class="flex flex-column justify-content-center gap-5 w-full min-h-custom">
        <div>
          <h1 class="m-0">Encuentre a los mejores profesionales</h1>
          <p class="m-0">Obtenga presupuestos gratuitos en cuestión de minutos</p>
        </div>
        <div class="w-6">
          <app-searchbar />
        </div>
      </div>
    </div>
  `,
  styles: `
    .min-h-custom {
      min-height: calc(100vh - 64px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {}
