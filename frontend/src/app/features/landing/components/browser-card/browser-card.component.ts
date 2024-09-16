import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-browser-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingModule],
  template: `
    <div
      class="flex gap-3 border-round w-full h-14rem px-2 py-3 shadow-5">
      <div class="w-5">
        <div
          class="w-full h-full bg-cover bg-center bg-no-repeat border-round-xs"
          [style.backgroundImage]="'url(' + data().photo + ')'"></div>
      </div>
      <div class="flex flex-column justify-content-between w-7">
        <h2 class="capitalize text-lg m-0">{{ data().title }}</h2>
        <div class="flex gap-2">
          <span>{{ averageRating }}</span>
          <p-rating [ngModel]="data().rating" [readonly]="true" [cancel]="false" />
        </div>
        <span>{{ data().price }}</span>
        <p class="m-0 text-color-secondary">{{ data().text }}</p>
        <span>{{ data().area }}</span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowserCardComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly router = inject(Router);
  public readonly data = input.required<any>();

  public get averageRating(): number {
    const rating = this.data().rating;
    return rating.toFixed(1);
  }

  public onNavigate(route: string): void {
    this.router.navigate([route]);
  }
}
