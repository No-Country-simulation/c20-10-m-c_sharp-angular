import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

import * as fuzzysort from 'fuzzysort';

import { CATEGORIES_LIST, CategoryList } from '../../../../shared/const/categoriesList.const';
import { FormsModule } from '@angular/forms';
import { ROUTES_PATH } from '../../../../core/routes';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoCompleteModule, ButtonModule, FloatLabelModule],
  template: `
    <p-floatLabel>
      <p-autoComplete
        class="w-full"
        styleClass="w-full"
        inputStyleClass="w-full"
        field="label"
        emptyMessage="No se encontro la categoria"
        [ngModel]="currentCategory()"
        [suggestions]="suggestions"
        (completeMethod)="onSearch($event)"
        (onSelect)="onSelect($event)" />
      <label for="float-label">¿Que servicio estas buscando?</label>
    </p-floatLabel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {
  private readonly router = inject(Router);
  public suggestions: CategoryList[] = [];
  public currentCategory = input<string>();

  public onSearch(event: AutoCompleteCompleteEvent): void {
    const query = event.query;
    const results = fuzzysort.go(query, CATEGORIES_LIST, { key: 'label' });
    this.suggestions = results.map(result => result.obj);
  }

  public onSelect(event: AutoCompleteSelectEvent): void {
    console.log(event);
    const selectedCategory = event.value;
    this.router.navigate([ROUTES_PATH.LANDING_BROWSER + selectedCategory.value.url], {
      state: { id: selectedCategory.value.id },
    });
  }
}
