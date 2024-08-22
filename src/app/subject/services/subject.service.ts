import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subject, SubjectPhoto } from '../interfaces/subject.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/subjects`);
  }

  getSubject(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.baseUrl}/subject/${id}`);
  }

  filterSubjects(categoryId?: number, profileId?: number, specializationId?: number): Observable<Subject[]> {
    const params: any = {};
    if (categoryId) {
      params.categories = categoryId.toString();
    }
    if (profileId) {
      params.profiles = profileId.toString();
    }
    if (specializationId) {
      params.specializations = specializationId.toString();
    }

    return this.http.get<Subject[]>(`${this.baseUrl}/subject-filter`, { params });
  }

  postSubject(form: FormData): Observable<Subject> {
    return this.http.post<Subject>(`${this.baseUrl}/subject`, form);
  }

  putSubject(id: number, subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${this.baseUrl}/subject/${id}`, subject);
  }

  deleteSubject( id: number ): Observable<Subject> {
    return this.http.delete<Subject>(`${this.baseUrl}/subject/${id}`);
  }

  // Funciones para las imagenes

  postSubjectPhoto(form: FormData): Observable<SubjectPhoto> {
    return this.http.post<SubjectPhoto>(`${this.baseUrl}/photo`, form);
  }

  deleteSubjectPhoto( id: number ): Observable<SubjectPhoto> {
    return this.http.delete<SubjectPhoto>(`${this.baseUrl}/photo/${id}`);
  }
}
