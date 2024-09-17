import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { ORDER_FILTER } from '../../utils';

@Component({
  selector: 'app-order-filter',
  standalone: true,
  imports: [CommonModule, DropdownModule],
  template: `
    <p-dropdown
      styleClass="w-full"
      optionLabel="label"
      optionValue="value"
      placeholder="Ordenar por"
      [options]="order"
      (onChange)="handleOrder($event)" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFilterComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public readonly order = [
    {
      label: 'Por defecto',
      value: ORDER_FILTER.DEFAULT,
    },
    {
      label: 'Mejores calificados',
      value: ORDER_FILTER.BY_RATING,
    },
    {
      label: 'Mas cercanos',
      value: ORDER_FILTER.BY_NEAREST,
    },
  ];

  public handleOrder(event: DropdownChangeEvent): void {
    const cleanCategory = event.value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { orden: cleanCategory },
      queryParamsHandling: 'merge',
    });
  }
}
