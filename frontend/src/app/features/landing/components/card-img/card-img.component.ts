import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-img',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <button
      class="custom-w relative border-round-md overflow-hidden cursor-pointer reset-btn"
      (click)="onNavigate(data().name)">
      <img class="w-full" [src]="data().src" alt="Imagen de la categoria {{ data().name }}" />
      <div class="absolute top-0 left-0 w-full h-full custom-bg border-round-md"></div>
      <h2 class="absolute text-white text-xl md:text-3xl custom-position select-none">
        {{ data().name }}
      </h2>
    </button>
  `,
  styles: `
    .custom-bg {
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.1) 30%,
        transparent 70%
      );
    }
    .custom-position {
      left: 1.25rem;
      bottom: 0rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardImgComponent {
  private readonly router = inject(Router);

  /**
   * @requires
   * - name
   * - src: image folder
   * - route: url
   */
  public readonly data = input.required<any>();

  public onNavigate(route: string) {
    const cleanUrl = route.toLowerCase().replace(/ /g, '-');
    this.router.navigate([this.data().route, cleanUrl]);
  }
}
