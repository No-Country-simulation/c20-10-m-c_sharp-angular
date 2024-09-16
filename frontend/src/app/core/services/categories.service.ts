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
   * Retrieves all categories.
   *
   * @returns An Observable containing an array of `CategoryResponse` objects.
   */
  public getAllCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.baseUrl + this.categoryEndpoint);
  }

  /**
   * Creates a new category.
   *
   * @param formValue - The category data to create.
   * @returns An Observable containing the created `CategoryResponse` object.
   */
  public createCategory(formValue: Category): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.baseUrl + this.categoryEndpoint, formValue);
  }

  /**
   * Retrieves a category by its ID.
   *
   * @param id - The ID of the category to retrieve.
   * @returns An Observable containing the fetched `CategoryResponse` object.
   */
  public getCategoryById(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.baseUrl + this.categoryEndpoint + '/' + id);
  }

  /**
   * Updates a category by its ID.
   *
   * @param formValue - The updated category data.
   * @param id - The ID of the category to update.
   * @returns An Observable containing the updated `CategoryResponse` object.
   */
  public updateCategoryById(formValue: Category, id: number): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(
      this.baseUrl + this.categoryEndpoint + '/' + id,
      formValue
    );
  }

  /**
   * Deletes a category by its ID.
   *
   * @param id - The ID of the category to delete.
   * @returns An Observable that emits `true` if the deletion was successful, otherwise `false`.
   */
  public deleteCategoryById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + this.categoryEndpoint + '/' + id);
  }
}
