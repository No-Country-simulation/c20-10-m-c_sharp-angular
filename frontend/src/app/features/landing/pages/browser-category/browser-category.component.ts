/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';

import {
  BrowserCardComponent,
  SearchbarComponent,
  OrderFilterComponent,
  CardImgComponent,
} from '../../components';

@Component({
  selector: 'app-browser-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    OrderFilterComponent,
    SearchbarComponent,
    ButtonModule,
    CardModule,
    RatingModule,
    BrowserCardComponent,
    CardImgComponent,
  ],
  template: `
    <div class="container-c flex flex-column gap-5 py-5">
      <div class="w-full">
        <app-searchbar />
      </div>
      <div>
        <h1 class="text-xl">Todas las especialidades de {{ currentCategory() }}</h1>
        <div class="flex flex-wrap gap-3">
          @for (item of specialityWithRoutes(); track $index) {
            <app-card-img [data]="item" />
          } @empty {
            <h2>No hay categorias</h2>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .custom-width {
      width: calc(50% - 0.5rem);
    }
    @media (width <= 768px) {
      .custom-width {
        width: 100%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BrowserCategoryComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  public readonly currentCategory = signal<string>('');
  public readonly allSpecialityByCategory = signal<any>([]);
  public readonly specialityWithRoutes = signal<any[]>([]);

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.currentCategory.set(data['categories'].currentCategory);
      this.allSpecialityByCategory.set(data['categories'].specialitiesByCategory);
    });

    const dataWithRoutes = this.allSpecialityByCategory().map((data: any) => {
      return {
        ...data,
        route: `/explorar/categoria/${this.currentCategory()}/especialidad/`,
      };
    });
    this.specialityWithRoutes.set(dataWithRoutes);
  }
}
