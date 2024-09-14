import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { BrowserCardComponent, OrderFilterComponent, SearchbarComponent } from '../../components';
import { ROUTES_PATH } from '../../../../core/routes';

@Component({
  selector: 'app-browser-speciality',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BrowserCardComponent,
    SearchbarComponent,
    OrderFilterComponent,
  ],
  template: `
    <div class="container-c flex flex-column gap-5 py-5">
      <div class="w-full">
        <app-searchbar />
      </div>
      <div>
        <span class="font-medium">{{ data().currentSpeciality }}</span>
        <span class="text-sm text-color-secondary">
          ({{ data().offerorResults.length }} resultados)</span
        >
      </div>
      <div class="w-5 sm:w-3">
        <app-order-filter [disabled]="data().offerorResults.length === 0" />
      </div>
      <div class="flex flex-column gap-3">
        @for (item of data().offerorResults; track $index) {
          <app-browser-card [data]="item" (click)="irDescripcion(item)"/>
        } @empty {
          <div class="flex flex-column justify-content-center align-items-center h-30rem">
            <p class="text-2xl">No se encontraron resultados</p>
            <p-button label="Volver al explorador" [routerLink]="routesPath.LANDING_BROWSER" />
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BrowserSpecialityComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly data = signal<any>([]);
  public readonly routesPath = ROUTES_PATH;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.data.set(data['data']);
    });
  }

  irDescripcion(item : any){
    this.router.navigate(["/explorar/post",item]);
  }
}
