import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Specialization } from '../interfaces/specialization.interface';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getSpecializations(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(`${this.baseUrl}/specializations`);
  }

  getSpecialization(specialization: Specialization): Observable<Specialization> {
    return this.http.get<Specialization>(`${this.baseUrl}/specialization/${specialization}`);
  }

  filterSpecializations(categoryId?: number, profileId?: number): Observable<Specialization[]> {
    const params: any = {};
    if (categoryId) {
      params.categories = categoryId.toString();
    }
    if (profileId) {
      params.profiles = profileId.toString();
    }
    return this.http.get<Specialization[]>(`${this.baseUrl}/specialization-filter`, { params });
  }

  postSpecialization(specialization: Specialization): Observable<Specialization> {
    return this.http.post<Specialization>(`${this.baseUrl}/specialization`, specialization);
  }

  putSpecialization(id: number, specialization: Specialization): Observable<Specialization> {
    return this.http.put<Specialization>(`${this.baseUrl}/specialization/${id}`, specialization);
  }

  deleteSpecialization( id: number ): Observable<Specialization> {
    return this.http.delete<Specialization>(`${this.baseUrl}/specialization/${id}`);
  }
}
