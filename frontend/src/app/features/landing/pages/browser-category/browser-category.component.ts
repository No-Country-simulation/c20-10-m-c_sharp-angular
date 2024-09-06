import { ROUTES_PATH } from './../../../../core/routes/routes-path.const';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';

import { BrowserCardComponent, SearchbarComponent, OrderFilterComponent } from '../../components';
import { CATEGORIES_LIST } from '../../../../shared/const/categoriesList.const';

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
  ],
  template: `
    <div class="flex flex-column gap-5">
      <div class="flex justify-content-center w-full mt-5">
        <app-searchbar />
      </div>
      <div>
        <span class="font-medium">{{ currentCategory() }}</span>
        <span class="text-sm text-color-secondary"> ({{ listServices().length }} resultados)</span>
      </div>
      <div class="w-5 sm:w-3">
        <app-order-filter [disabled]="listServices().length === 0" />
      </div>
      <div class="flex flex-column gap-3">
        @for (item of listServices(); track $index) {
          <app-browser-card [data]="item" />
        } @empty {
          <div class="flex flex-column justify-content-center align-items-center h-30rem">
            <p class="text-2xl">No se encontraron resultados</p>
            <p-button label="Volver al explorador" [routerLink]="routesPath.LANDING_BROWSER" />
          </div>
        }
      </div>
      6
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BrowserCategoryComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesLIst = CATEGORIES_LIST;
  public readonly routesPath = ROUTES_PATH;

  public currentCategory = signal<string>('');

  public listServices = signal<any>([]);

  private listServicesMock = signal([
    {
      cover: '/assets/images/auth/login.webp',
      categoryId: '7', // 'Mecánico'
      title: 'Mecánico',
      rating: 4.5,
      price: 'Precio a convenir',
      description:
        'Especialista en reparaciones y mantenimiento de automóviles. Trabajo con todas las marcas y modelos...',
      location: 'Córdoba, Argentina',
    },
    {
      cover: '/assets/images/auth/login.webp',
      categoryId: '3', // 'Carpintero'
      title: 'Carpintero',
      rating: 4.7,
      price: 'Desde $200 por hora',
      description:
        'Realizo muebles a medida, restauración de muebles antiguos, y trabajos de carpintería en general...',
      location: 'Rosario, Argentina',
    },
    {
      cover: '/assets/images/auth/login.webp',
      categoryId: '15', // 'Yesero'
      title: 'Yesero',
      rating: 4.2,
      price: 'A convenir',
      description:
        'Aplicación de yeso en paredes y techos, reparaciones de grietas y trabajos en molduras decorativas...',
      location: 'Mendoza, Argentina',
    },
    {
      cover: '/assets/images/auth/login.webp',
      categoryId: '1', // 'Plomero'
      title: 'Plomero',
      rating: 4.9,
      price: 'Consulta sin cargo',
      description:
        'Servicio de instalación y reparación de cañerías, destapaciones y mantenimiento de instalaciones de agua...',
      location: 'Buenos Aires, Argentina',
    },
    {
      cover: '/assets/images/auth/login.webp',
      categoryId: '10', // 'Gasfitero'
      title: 'Gasfitero',
      rating: 4.4,
      price: 'Desde $1500 por servicio',
      description:
        'Instalación y mantenimiento de sistemas de gas, detección de fugas y reparación de calefones...',
      location: 'Mar del Plata, Argentina',
    },
    {
      cover: '/assets/images/auth/login.webp',
      categoryId: '18', // 'Techador'
      title: 'Techador',
      rating: 4.1,
      price: 'Precio a convenir',
      description:
        'Servicios de instalación y reparación de techos, impermeabilización y colocación de tejas...',
      location: 'San Juan, Argentina',
    },
    {
      cover: '/assets/images/auth/login.webp',
      categoryId: '22', // 'Mudanza y transporte'
      title: 'Mudanza y transporte',
      rating: 4.6,
      price: 'Desde $3000 por traslado',
      description:
        'Servicio de mudanzas, embalaje y transporte de muebles y objetos frágiles. Cobertura nacional...',
      location: 'La Plata, Argentina',
    },
    {
      cover: '/assets/images/auth/login.webp',
      categoryId: '24', // 'Reparador de electrodomésticos'
      title: 'Reparador de electrodomésticos',
      rating: 4.3,
      price: 'Presupuesto sin costo',
      description:
        'Reparación de todo tipo de electrodomésticos: lavadoras, neveras, microondas, etc...',
      location: 'Santa Fe, Argentina',
    },
    {
      cover: '/assets/images/auth/login.webp',
      categoryId: '0',
      title: 'electricista',
      rating: 4.3,
      price: 'Precio a convenir',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...',
      location: 'Buenos aires...',
    },
  ]);

  constructor() {
    this.activatedRoute.params.subscribe(params => {
      const category = this.categoriesLIst.filter(
        category => category.value.url === params['categoryName']
      );
      this.currentCategory.set(category[0].label);

      const filteredServices = this.listServicesMock().filter(service => {
        return service.categoryId === category[0].value.id;
      });

      // Multiplicar el array por 10
      const multipliedServices = this.multiplyArray(filteredServices, this.getRandomInt(1, 10));

      this.listServices.set(multipliedServices);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const list = [...this.listServicesMock()];
      switch (params.get('orden')) {
        case 'mejores-calificados':
          this.listServices.set(list.sort((a, b) => b.rating - a.rating));
          break;
        case 'mas-cercanos':
          // this.listServices.set(list.sort((a, b) => a.location.localeCompare(b.location)));
          break;
        case 'a-z':
          this.listServices.set(list.sort((a, b) => a.title.localeCompare(b.title)));
          break;
        case 'z-a':
          this.listServices.set(list.sort((a, b) => b.title.localeCompare(a.title)));
          break;
        case 'por-defecto':
          this.listServices.set(list);
          break;
      }
    });
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private multiplyArray(array: any[], times: number): any[] {
    return Array.from({ length: times }, () => array).flat();
  }
}
