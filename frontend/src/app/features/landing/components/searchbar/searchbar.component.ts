/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

import * as fuzzysort from 'fuzzysort';

import { CategoriesService, SpecialitiesService } from '../../../../core/services';
import { ROUTES_PATH } from '../../../../core/routes';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoCompleteModule, ButtonModule, FloatLabelModule],
  template: `
    <span class="p-input-icon-right w-full">
      <p-floatLabel>
        <p-autoComplete
          class="w-full"
          styleClass="w-full"
          inputStyleClass="w-full"
          field="name"
          inputId="searchbar"
          emptyMessage="No se encontró la categoría"
          [group]="true"
          [suggestions]="filteredSuggestions"
          (completeMethod)="onSearch($event)"
          (onDropdownClick)="onSearch($event)"
          (keydown.enter)="onKeyDownEnter($event)">
          <ng-template let-category pTemplate="group">
            <button
              class="reset-btn text-color cursor-pointer"
              (click)="onSelectCategory(category)"
              (mousedown)="onSelectCategory(category)"
              (keydown.enter)="onSelectCategory(category)">
              {{ category.name }}
            </button>
          </ng-template>
          <ng-template let-speciality pTemplate="item">
            <button
              class="reset-btn"
              (click)="onSelectSpeciality(speciality)"
              (mousedown)="onSelectSpeciality(speciality)"
              (keydown.enter)="onSelectSpeciality(speciality)">
              <span class="pl-2">
                {{ speciality.name }}
              </span>
            </button>
          </ng-template>
        </p-autoComplete>

        <label for="searchbar">¿Qué servicio estás buscando?</label>
      </p-floatLabel>
      <i class="pi pi-search"></i>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent implements OnInit {
  private readonly specialitiesService = inject(SpecialitiesService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public allData: any[] = [];
  public filteredSuggestions: any[] = [];

  public ngOnInit(): void {
    this.getCategoriesAndSpecialities();
  }

  public getCategoriesAndSpecialities(): void {
    forkJoin({
      categories: this.categoriesService.getAllCategories(),
      specialities: this.specialitiesService.getAllSpecialities(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ categories, specialities }) => {
        this.buildDataStructure(categories, specialities);
      });
  }

  public buildDataStructure(categories: any[], specialities: any[]): void {
    const data = categories.map(category => {
      const categorySpecialities = specialities
        .filter(speciality => category.listSpecialitiesId.includes(speciality.specialityId))
        .map(speciality => ({
          name: speciality.name,
          specialityId: speciality.specialityId,
        }));

      return {
        category: {
          name: category.name,
          categoryId: category.categoryId,
        },
        specialities: categorySpecialities,
      };
    });

    this.allData = data;
  }

  public onSearch(event: AutoCompleteCompleteEvent): void {
    this.filteredSuggestions = this.filterSuggestions(event.query);
  }

  public filterSuggestions(query: string): any[] {
    const filteredCategories = fuzzysort.go(query, this.allData, { key: 'category.name' });
    const filteredSpecialities = fuzzysort.go(
      query,
      this.allData.flatMap(data => data.specialities),
      { key: 'name' }
    );

    const suggestionsMap: Record<number, any> = {};

    filteredCategories.forEach(result => {
      const category = result.obj;

      suggestionsMap[category.category.categoryId] = {
        ...category.category,
        items: [...category.specialities],
      };
    });

    filteredSpecialities.forEach(result => {
      const speciality = result.obj;

      const category = this.allData.find(cat =>
        cat.specialities.some(
          (s: { specialityId: any }) => s.specialityId === speciality.specialityId
        )
      );

      if (category) {
        if (!suggestionsMap[category.category.categoryId]) {
          suggestionsMap[category.category.categoryId] = {
            ...category.category,
            items: [],
          };
        }

        suggestionsMap[category.category.categoryId].items.push(speciality);
      }
    });

    return Object.values(suggestionsMap);
  }

  public onSelectCategory(category: any): void {
    const cleanUrl = category.name.toLowerCase().replace(/ /g, '-');
    this.router.navigate([ROUTES_PATH.LANDING_BROWSER_CATEGORIES + '/' + cleanUrl]);
  }

  public onSelectSpeciality(speciality: any): void {
    const cleanUrl = speciality.name.toLowerCase().replace(/ /g, '-');
    const category = this.allData.find(cat =>
      cat.specialities.some(
        (sp: { specialityId: any }) => sp.specialityId === speciality.specialityId
      )
    );
    if (category) {
      this.router.navigate([
        ROUTES_PATH.LANDING_BROWSER_CATEGORIES +
          '/' +
          category.category.name.toLowerCase().replace(/ /g, '-') +
          '/especialidad/' +
          cleanUrl,
      ]);
    }
  }

  public onKeyDownEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const input = (keyboardEvent.target as HTMLInputElement).value;

    const categoryResult = fuzzysort.go(input, this.allData, { key: 'category.name' });
    if (categoryResult.length > 0) {
      const category = categoryResult[0].obj.category;
      this.onSelectCategory(category);
      return;
    }

    const specialityResult = fuzzysort.go(
      input,
      this.allData.flatMap(data => data.specialities),
      { key: 'name' }
    );
    if (specialityResult.length > 0) {
      const speciality = specialityResult[0].obj;
      this.onSelectSpeciality(speciality);
    }
  }
}
