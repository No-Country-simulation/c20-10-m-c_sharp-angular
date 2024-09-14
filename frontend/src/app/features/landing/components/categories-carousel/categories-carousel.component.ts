import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

import { register } from 'swiper/element/bundle';
register();

import { CardImgComponent } from '../../components';
import { CategoryResponse } from '../../../../core/interfaces';

@Component({
  selector: 'app-categories-carousel',
  standalone: true,
  imports: [CommonModule, CardImgComponent],
  template: `
    <swiper-container pagination="false" slides-per-view="1.5" space-between="24" free-mode="true">
      @for (item of data(); track $index) {
        <swiper-slide class="relative custom-ml cursor-pointer">
          <app-card-img [data]="item" />
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
    @media (width > 767px) {
      .custom-ml {
        &:first-child {
          margin-left: 0;
        }
      }
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesCarouselComponent {
  public readonly data = input.required<CategoryResponse[]>();
}
