import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

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
      [disabled]="disabled()"
      [options]="order"
      (onChange)="handleOrder($event)" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFilterComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public disabled = input.required<boolean>();

  public readonly order = [
    {
      label: 'Por defecto',
      value: 'por-defecto',
    },
    {
      label: 'Mejores calificados',
      value: 'mejores-calificados',
    },
    {
      label: 'Mas cercanos',
      value: 'mas-cercanos',
    },
    {
      label: 'A - Z',
      value: 'a-z',
    },
    {
      label: 'Z - A',
      value: 'z-a',
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
