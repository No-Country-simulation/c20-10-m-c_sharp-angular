import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  OnInit,
  signal,
} from '@angular/core';

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
      @for (item of dataWithRoutes(); track $index) {
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
export class CategoriesCarouselComponent implements OnInit {
  public readonly data = input.required<CategoryResponse[]>();
  public readonly dataWithRoutes = signal<CategoryResponse[]>([]);

  ngOnInit(): void {
    const dataWithRoutes = this.data().map(data => {
      return {
        ...data,
        route: 'explorar/categoria/',
      };
    });
    this.dataWithRoutes.set(dataWithRoutes);
  }
}
