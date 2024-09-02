import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Category, CategoryResponse } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly categoryEndpoint = environment.ENDPOINT.CATEGORY;

  private buildUrl(category?: Category): string {
    return category && category.id
      ? `${this.baseUrl}${this.categoryEndpoint}/${category.id}`
      : `${this.baseUrl}${this.categoryEndpoint}`;
  }

  public getAllCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.buildUrl());
  }

  public createCategory(category: Category): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.buildUrl(), category);
  }

  public getCategoryById(category: Category): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.buildUrl(category));
  }

  public updateCategoryById(category: Category): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(this.buildUrl(category), category);
  }

  public deleteCategoryById(category: Category): Observable<boolean> {
    return this.http.delete<boolean>(this.buildUrl(category));
  }
}
