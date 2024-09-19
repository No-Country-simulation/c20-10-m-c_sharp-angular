import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RatingModule } from 'primeng/rating';
import { UserSpecialitySearch } from '../../../../core/interfaces';

@Component({
  selector: 'app-browser-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingModule],
  template: `
    <button
      class="reset-btn flex gap-3 border-round w-full h-14rem px-2 py-3 cursor-pointer shadow-5"
      (click)="onNavigate(data().route)">
      <div class="w-5">
        <div
          class="w-full h-full bg-contain bg-center bg-no-repeat border-round-xs"
          [style.backgroundImage]="'url(' + data().src + ')'"></div>
      </div>
      <div class="flex flex-column justify-content-between w-7">
        <h2 class="capitalize text-lg m-0">{{ data().title }}</h2>
        <div class="flex gap-2">
          <span>{{ averageRating }}</span>
          <p-rating [ngModel]="data().rating" [readonly]="true" [cancel]="false" />
        </div>
        <!-- <span>{{ data().price }}</span> -->
        <p class="m-0 text-color-secondary">{{ data().text }}</p>
        <span>{{ data().area }}</span>
      </div>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowserCardComponent {
  private readonly router = inject(Router);
  public readonly data = input.required<UserSpecialitySearch>();

  public get averageRating(): string {
    const rating = this.data().rating;
    return rating.toFixed(1);
  }

  public onNavigate(route: string): void {
    this.router.navigate([route]);
  }
}
