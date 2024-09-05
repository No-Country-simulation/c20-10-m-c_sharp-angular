import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { LandingHeaderComponent, LandingFooterComponent } from '../../layout';
import { SearchbarComponent, CategoriesCarouselComponent } from '../../components';
import { AuthService } from '../../../../core/services';

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
    CategoriesCarouselComponent,
  ],
  template: `
    <div class="mt-5">
      <!-- <p-button styleClass="text-color" icon="pi pi-bars" text="true" /> -->
      <div class="flex justify-content-center w-full">
        <app-searchbar />
      </div>
      <h2 class="mt-6 mb-5 text-center text-regular text-base">Explora nuestras categorías</h2>
      <app-categories-carousel />
      <h2 class="mt-6 mb-5 text-center text-regular text-base">¿Que opinan nuestros usuarios?</h2>
    </div>
  `,
  styles: `
    .min-h-custom {
      min-height: calc(100vh - 64px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  public readonly authService = inject(AuthService);
}
