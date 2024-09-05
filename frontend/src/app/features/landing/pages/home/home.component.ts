import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { LandingHeaderComponent } from '../../layout/landing-header/landing-header.component';
import { LandingFooterComponent } from '../../layout/landing-footer/landing-footer.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { AuthService } from '../../../../core/services';



@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterModule, ButtonModule, LandingHeaderComponent, LandingFooterComponent, SearchbarComponent],
  templateUrl: './home.component.html',
=======
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
>>>>>>> c2c011febd340d030ef63ee92c66b9b006dc94e8
  changeDetection: ChangeDetectionStrategy.OnPush,

})
<<<<<<< HEAD
export default class HomeComponent {

  public readonly authService = inject(AuthService);
}
=======
export default class HomeComponent {}
>>>>>>> c2c011febd340d030ef63ee92c66b9b006dc94e8
