import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-categories-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carousel-container">
      <div class="carousel-items" #carouselItems>
        @for (item of items; track $index) {
          <div class="carousel-item">
            <div class="border-round-md w-15rem h-8rem bg-red-500"></div>
            <!-- <img [src]="item.image" alt="Carousel Item" /> -->
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    .carousel-container {
      overflow: hidden;
      cursor: grab;
      position: relative;
      width: 100%;
    }

    .carousel-items {
      display: flex;
      transition: transform 0.3s ease;
      scroll-behavior: smooth;
      user-select: none;
      -webkit-user-drag: none;
    }

    .carousel-item {
      margin-inline: 12px;
      transition: transform 0.3s;
      flex-shrink: 0;
    }

    .carousel-container:active {
      cursor: grabbing;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesCarouselComponent {
  items = [{}, {}, {}, {}];
}
