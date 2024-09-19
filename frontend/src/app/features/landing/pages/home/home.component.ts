import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonModule } from 'primeng/button';

import { LandingHeaderComponent, LandingFooterComponent } from '../../layout';
import {
  SearchbarComponent,
  OpinionCarouselComponent,
  CategoriesCarouselComponent,
} from '../../components';

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
    OpinionCarouselComponent,
  ],
  template: `
    <main class="layout-container px-0">
      <div class="px-7 md:px-0">
        <app-searchbar></app-searchbar>
      </div>
      <h2 class="mt-6 mb-3 text-center text-regular text-base">Explora nuestras categorías</h2>
      <app-categories-carousel [data]="data()[0].allCategories"></app-categories-carousel>
      <h2 class="mt-6 mb-3 text-center text-regular text-base">¿Qué opinan nuestros usuarios?</h2>
      <app-opinion-carousel></app-opinion-carousel>
    </main>
  `,
  styles: `
    .min-h-custom {
      min-height: calc(100vh - 64px);
    }

    .button-searchbar-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  public readonly data = signal<any>([]);

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.data.set(res);
    });
  }
}
