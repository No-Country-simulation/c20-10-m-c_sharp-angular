import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  BrowserCardComponent,
  OrderFilterComponent,
  SearchbarComponent,
  NotFoundResultsComponent,
} from '../../components';
import { BrowserPostsCombinedData } from '../../interfaces';

@Component({
  selector: 'app-browser-speciality',
  standalone: true,
  imports: [
    CommonModule,
    BrowserCardComponent,
    SearchbarComponent,
    OrderFilterComponent,
    NotFoundResultsComponent,
  ],
  template: `
    <div class="layout-container flex flex-column gap-5">
      <div class="w-full">
        <app-searchbar></app-searchbar>
      </div>
      <div>
        <span class="font-medium">{{ currentSpeciality() }}</span>
        <span class="text-sm text-color-secondary">
          ({{ data().offerorResults.length }} resultados)</span
        >
      </div>
      @if (data().offerorResults.length > 1) {
        <div class="w-5 sm:w-3">
          <app-order-filter />
        </div>
      }
      <div class="flex flex-column gap-3">
        @for (item of data().offerorResults; track $index) {
          <app-browser-card [data]="item" />
        } @empty {
          <app-not-found-results />
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BrowserSpecialityComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly data = signal<BrowserPostsCombinedData>({} as BrowserPostsCombinedData);
  public readonly currentSpeciality = signal<string>('');

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.data.set(data['data']);
      const currentSpeciality = this.formatCurrentSpeciality(data['data'].currentSpeciality);
      this.currentSpeciality.set(currentSpeciality);
    });
  }

  public formatCurrentSpeciality(currentSpeciality: string): string {
    const replacedString = currentSpeciality.replace(/-/g, ' ');
    const formattedString = replacedString.charAt(0).toUpperCase() + replacedString.slice(1);
    return formattedString;
  }
}
