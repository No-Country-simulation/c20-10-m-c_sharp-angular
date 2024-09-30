import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { SearchbarComponent, CardImgComponent, NotFoundResultsComponent } from '../../components';
import { CategoryResponse } from '../../../../core/interfaces';
import { revealAnimation } from '../../../../shared/animations';
import { ROUTES_PATH } from '../../../../core/routes';

@Component({
  selector: 'app-browser',
  standalone: true,
  imports: [CommonModule, SearchbarComponent, CardImgComponent, NotFoundResultsComponent],
  animations: [revealAnimation],
  template: `
    <div class="layout-container flex flex-column gap-5">
      <div class="w-full">
        <app-searchbar />
      </div>
      <div>
        @if (currentRoute() === routesPath.LANDING_BROWSER) {
          <h1 class="text-xl">Todas nuestras categorias</h1>
        } @else {
          <h1 class="text-xl">Todas las especialidades de {{ currentCategory() }}</h1>
        }
        <div class="flex flex-wrap gap-3" [@revealAnimation]>
          @for (item of alldata(); track $index) {
            <div class="custom-w">
              <app-card-img [data]="item" />
            </div>
          } @empty {
            <app-not-found-results />
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .custom-w {
      width: calc(50% - 0.5rem);
    }
    @media (width <= 768px) {
      .custom-w {
        width: 100%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BrowserComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  public readonly currentCategory = signal<string | undefined>(undefined);
  public readonly currentRoute = signal<string | null>(null);

  public readonly routesPath = ROUTES_PATH;
  public readonly alldata = signal<CategoryResponse[]>([]);
  public readonly dataWithRoutes = signal<CategoryResponse[]>([]);

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.currentCategory.set(data['data']?.currentCategory);
      this.currentRoute.set(data['data'].currentRoute);
      this.alldata.set(data['data']?.res);
    });
  }
}
