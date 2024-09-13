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
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { SearchbarComponent, CardImgComponent } from '../../components';
import { CategoryResponse } from '../../../../core/interfaces';
import { ROUTES_PATH } from '../../../../core/routes';
import { revealAnimation } from '../../../../shared/animations';

@Component({
  selector: 'app-browser',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchbarComponent, CardImgComponent, ButtonModule],
  animations: [revealAnimation],
  template: `
    <div class="container-c flex flex-column gap-5 py-5">
      <div class="w-full">
        <app-searchbar />
      </div>
      <div>
        <h1 class="text-xl">Todas nuestras categorias</h1>
        <div class="flex flex-wrap gap-3" [@revealAnimation]>
          @for (item of allCategoriesWithRoutes(); track $index) {
            <app-card-img [data]="item" />
          } @empty {
            <div class="flex flex-column justify-content-center align-items-center h-30rem">
              <p class="text-2xl">No se encontraron especialidades</p>
              <p-button label="Volver a las categorias" [routerLink]="routesPath.LANDING_BROWSER" />
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .custom-w {
      width: calc(50% - 0.5rem);
    }
    .custom-bg {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.1), transparent);
    }
    .custom-position {
      bottom: -0.25rem;
      left: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BrowserComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  public readonly routesPath = ROUTES_PATH;
  public readonly allCategories = signal<CategoryResponse[]>([]);
  public readonly allCategoriesWithRoutes = signal<CategoryResponse[]>([]);

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.allCategories.set(data['data']);
    });
    const dataWithRoutes = this.allCategories().map(data => {
      return {
        ...data,
        route: `/explorar/categoria/`,
      };
    });
    this.allCategoriesWithRoutes.set(dataWithRoutes);
  }
}
