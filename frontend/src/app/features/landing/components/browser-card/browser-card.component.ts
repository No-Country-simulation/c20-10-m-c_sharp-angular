import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-browser-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingModule],
  template: `
    <div class="flex gap-3 border-round w-full h-14rem px-2 py-3 shadow-5">
      <div class="w-5">
        <div
          class="w-full h-full bg-cover bg-center bg-no-repeat border-round-xs"
          [style.backgroundImage]="'url(' + data().cover + ')'"></div>
      </div>
      <div class="flex flex-column justify-content-between w-7">
        <h2 class="capitalize text-lg m-0">{{ data().title }}</h2>
        <div class="flex gap-2">
          <span>{{ data().rating }}</span>
          <p-rating [ngModel]="data().rating" [readonly]="true" [cancel]="false" />
        </div>
        <span>{{ data().price }}</span>
        <p class="m-0 text-color-secondary">{{ sliceDescription(data().description) }}</p>
        <span>{{ data().location }}</span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowserCardComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly data = input<any>();

  public sliceDescription(description: string): string {
    return description.slice(0, 55) + '...';
  }
}
