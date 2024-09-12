import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { LandingHeaderComponent } from '../../layout/landing-header/landing-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CATEGORIES_LIST } from '../../../../shared/const/categoriesList.const';
import { CardModule } from 'primeng/card';
import { OrderFilterComponent } from '../../components';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { ROUTES_PATH } from '../../../../core/routes';

@Component({
  selector: 'app-browser',
  standalone: true,
  imports: [
    CommonModule,
    LandingHeaderComponent,
    CardModule,
    OrderFilterComponent,
    SearchbarComponent,
  ],
  template: `
    <div class="container-c flex flex-wrap gap-3 py-5">
      <div class=" w-full">
        <app-searchbar />
      </div>
      @for (item of categories; track $index) {
        <div class="custom-width cursor-pointer">
          <p-card styleClass="h-full overflow-hidden" (click)="onSelectCategory(item.value.url)">
            <ng-template pTemplate="header">
              <img alt="Card" src="https://primefaces.org/cdn/primeng/images/card-ng.jpg" />
            </ng-template>
            <p>{{ item.label }}</p>
          </p-card>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BrowserComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly categories = CATEGORIES_LIST;
  filter: string | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.filter = params['filtro'];
      this.aplicarFiltro(this.filter);
      console.log(params);
    });
  }

  aplicarFiltro(filtro: string | null) {
    if (filtro === 'mejores-calificados') {
      // Lógica para aplicar filtro de "mejores calificados"
    } else if (filtro === 'mas-cercanos') {
      // Lógica para aplicar filtro de "más cercanos"
    } else {
      // Lógica para el caso sin filtro o valor no reconocido
    }
  }

  onSelectCategory(category: any) {
    this.router.navigate([ROUTES_PATH.LANDING_BROWSER_CATEGORIES, category]);
  }
}
