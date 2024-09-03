import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OrderFilterComponent } from '../../components/order-filter/order-filter.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CATEGORIES_LIST } from '../../../../shared/const/categoriesList.const';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

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
  ],
  template: `
    <div class="flex flex-column gap-5">
      <div class="flex gap-2 md:gap-3 w-full">
        <div class="w-5 sm:w-3">
          <app-order-filter [disabled]="listServices().length === 0" />
        </div>
        <div class="w-7 sm:w-9">
          <app-searchbar [currentCategory]="currentCategory()" />
        </div>
      </div>
      <div class="flex flex-column gap-3">
        @for (item of listServices(); track $index) {
          <div class="flex gap-3 p-3 border-1 border-round surface-border">
            <div class="w-5 md:w-3">
              <img src="/assets/images/auth/login.webp" alt="" />
            </div>
            <div class="w-7 md:w-9 flex flex-column">
              <h2 class="m-0 capitalize">{{ item.title }}</h2>
              <p-rating [(ngModel)]="item.rating" [readonly]="true" [cancel]="false" />
              <span>Precio: {{ item.price }}</span>
              <p>{{ item.description }}</p>
              <span>{{ item.location }}</span>
            </div>
          </div>
        } @empty {
          <div class="flex flex-column justify-content-center align-items-center h-30rem">
            <p class="text-2xl">No se encontraron resultados</p>
            <p-button label="Volver al explorador" routerLink="/explorar" />
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BrowserCategoryComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesLIst = CATEGORIES_LIST;

  public currentCategory = signal<string>('');
  public listServices = signal([
    {
      title: 'electricista',
      rating: 4.3,
      price: 'Precio a convenir',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      location: 'Buenos aires - ...',
    },
    {
      title: 'electricista',
      rating: 4,
      price: 'Precio a convenir',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      location: 'Buenos aires - ...',
    },
    {
      title: 'electricista',
      rating: 5,
      price: 'Precio a convenir',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      location: 'Buenos aires - ...',
    },
    {
      title: 'electricista',
      rating: 4,
      price: 'Precio a convenir',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      location: 'Buenos aires - ...',
    },
    {
      title: 'electricista',
      rating: 3,
      price: 'Precio a convenir',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      location: 'Buenos aires - ...',
    },
  ]);

  rating = 3;

  constructor() {
    this.activatedRoute.params.subscribe(params => {
      const category = this.categoriesLIst.filter(
        category => category.value.url === params['categoryName']
      );
      this.currentCategory.set(category[0].label);
    });
  }
}
