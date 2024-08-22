import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getCategory(category: Category): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/${category}`);
  }

  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/category`, category);
  }

  putCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/category/${id}`, category);
  }

  deleteCategory( id: number ): Observable<Category> {
    return this.http.delete<Category>(`${this.baseUrl}/category/${id}`);
  }
}
