import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Category, CategoryResponse } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly categoryEndpoint = environment.ENDPOINT.CATEGORIES;

  /**
   * Builds the URL for category API requests.
   * If a category with an `id` is provided, the URL is built with the category's ID.
   * Otherwise, the URL is built for fetching all categories.
   *
   * @param category - The category object (optional).
   * @returns The complete URL as a string.
   */
  private buildUrl(category?: Category): string {
    return category && category.id
      ? `${this.baseUrl}${this.categoryEndpoint}/${category.id}`
      : `${this.baseUrl}${this.categoryEndpoint}`;
  }

  /**
   * Retrieves all categories.
   *
   * @returns An Observable containing an array of `CategoryResponse` objects.
   */
  public getAllCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.buildUrl());
  }

  /**
   * Creates a new category.
   *
   * @param category - The category object to be created.
   * @returns An Observable containing the created `CategoryResponse` object.
   */
  public createCategory(category: Category): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.buildUrl(), category);
  }

  /**
   * Retrieves a category by its ID.
   *
   * @param category - The category object with the ID to fetch.
   * @returns An Observable containing the fetched `CategoryResponse` object.
   */
  public getCategoryById(category: Category): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.buildUrl(category));
  }

  /**
   * Updates a category by its ID.
   *
   * @param category - The category object with updated data.
   * @returns An Observable containing the updated `CategoryResponse` object.
   */
  public updateCategoryById(category: Category): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(this.buildUrl(category), category);
  }

  /**
   * Deletes a category by its ID.
   *
   * @param category - The category object with the ID to delete.
   * @returns An Observable that emits `true` if the deletion was successful, otherwise `false`.
   */
  public deleteCategoryById(category: Category): Observable<boolean> {
    return this.http.delete<boolean>(this.buildUrl(category));
  }
}
