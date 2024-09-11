import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-categories-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <swiper-container pagination="false" slides-per-view="1.5" space-between="24" free-mode="true">
      @for (item of carouselImages; track $index) {
        <swiper-slide class="relative custom-ml cursor-pointer" [routerLink]="item.route">
          <div class="overflow-hidden border-round-md">
            <img class="w-full" [src]="item.src" [alt]="item.alt" />
            <div class="absolute top-0 left-0 w-full h-full custom-bg border-round-md"></div>
            <h2 class="absolute custom-position text-white text-3xl">{{ item.category_label }}</h2>
          </div>
        </swiper-slide>
      }
    </swiper-container>
  `,
  styles: `
    .custom-ml {
      &:first-child {
        margin-left: 1.5rem;
      }
    }
    .custom-bg {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1), transparent);
    }
    .custom-position {
      left: 1.25rem;
      bottom: -0.5rem;
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesCarouselComponent {
  /**
   * @todo El category_label enrealidad deberia seguir la estructura de la
   * interfaz categories o debe apuntar al de la categoria
   */
  public readonly carouselImages = [
    {
      id: 0,
      category_label: 'Hogar',
      route: '/explorar/categoria/hogar',
      src: '/assets/images/landing-page/carousel-categories/0.png',
      alt: '',
    },
    {
      id: 1,
      category_label: 'Automóvil',
      route: '/explorar/categoria/automovil',
      src: '/assets/images/landing-page/carousel-categories/1.png',
      alt: '',
    },
    {
      id: 2,
      category_label: 'Cuidados',
      route: '/explorar/categoria/cuidados',
      src: '/assets/images/landing-page/carousel-categories/2.png',
      alt: '',
    },
    {
      id: 3,
      category_label: 'Mascotas',
      route: '/explorar/categoria/mascotas',
      src: '/assets/images/landing-page/carousel-categories/3.png',
      alt: '',
    },
    {
      id: 4,
      category_label: 'Belleza',
      route: '/explorar/categoria/belleza',
      src: '/assets/images/landing-page/carousel-categories/4.png',
      alt: '',
    },
  ];
}
