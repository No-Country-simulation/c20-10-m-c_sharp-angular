import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import {
  BrowserCardComponent,
  OrderFilterComponent,
  SearchbarComponent,
  NotFoundResultsComponent,
} from '../../components';
import { DistancesService, SessionStorageService } from '../../../../core/services';
import { UserSpecialitySearch } from '../../../../core/interfaces';
import { environment } from '../../../../../environments/environment';
import { ORDER_FILTER } from '../../utils';

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
        <span class="text-sm text-color-secondary"> ({{ currentData().length }} resultados)</span>
      </div>
      @if (currentData().length > 1) {
        <div class="w-5 sm:w-3">
          <app-order-filter />
        </div>
      }
      <div class="flex flex-column gap-3">
        @for (item of currentData(); track $index) {
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
  private readonly sessionStorageService = inject(SessionStorageService);
  private readonly distancesService = inject(DistancesService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  public readonly data = signal<UserSpecialitySearch[]>([]);
  public readonly currentData = signal<UserSpecialitySearch[]>([]);
  public readonly currentSpeciality = signal<string>('');

  public readonly currentUserLocationKey = environment.SESSION_STORAGE.CURRENT_USER_LOCATION;
  public readonly currentLocation = this.sessionStorageService.get(this.currentUserLocationKey);

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      const dataWithDistance = this.distancesService.calculateDistances(
        this.currentLocation.lat,
        this.currentLocation.lon,
        data['data'].offerorResults
      );
      this.data.set(dataWithDistance);
      const currentSpeciality = this.formatCurrentSpeciality(data['data'].currentSpeciality);
      this.currentSpeciality.set(currentSpeciality);
    });
    this.orderFilter();
  }

  private orderFilter() {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(queryParams => {
        switch (queryParams[ORDER_FILTER.QUERY_PARAM]) {
          case ORDER_FILTER.DEFAULT: {
            this.defaultOrder();
            break;
          }
          case ORDER_FILTER.BY_NEAREST: {
            this.byNearestOrder();
            break;
          }
          case ORDER_FILTER.BY_RATING: {
            this.byRatingOrder();
            break;
          }
          default: {
            this.defaultOrder();
            break;
          }
        }
      });
  }

  private defaultOrder(): void {
    const data = [...this.data()];
    this.currentData.set(data);
  }

  private byRatingOrder(): void {
    const data = [...this.data()].sort((a, b) => b.rating - a.rating);
    this.currentData.set(data);
  }

  private byNearestOrder(): void {
    const data = [...this.data()].sort((a, b) => a.distance! - b.distance!);
    this.currentData.set(data);
  }

  public formatCurrentSpeciality(currentSpeciality: string): string {
    const replacedString = currentSpeciality.replace(/-/g, ' ');
    const formattedString = replacedString.charAt(0).toUpperCase() + replacedString.slice(1);
    return formattedString;
  }
}
