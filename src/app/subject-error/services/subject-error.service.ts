import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubjectError, SubjectErrorImage } from '../interfaces/subject-error.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectErrorService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getSubjectErrors(subjectId: number): Observable<SubjectError[]> {
    return this.http.get<SubjectError[]>(`${this.baseUrl}/errors/${subjectId}`);
  }

  getSubjectError(error: SubjectError): Observable<SubjectError> {
    return this.http.get<SubjectError>(`${this.baseUrl}/error/${error}`);
  }

  postSubjectError(form: FormData): Observable<SubjectError> {
    return this.http.post<SubjectError>(`${this.baseUrl}/error`, form);
  }

  putSubjectError(id: number, error: SubjectError): Observable<SubjectError> {
    return this.http.put<SubjectError>(`${this.baseUrl}/error/${id}`, error);
  }

  deleteSubjectError( id: number ): Observable<SubjectError> {
    return this.http.delete<SubjectError>(`${this.baseUrl}/error/${id}`);
  }

  // Funciones para las imagenes

  postSubjectErrorImage(form: FormData): Observable<SubjectErrorImage> {
    return this.http.post<SubjectErrorImage>(`${this.baseUrl}/image-error`, form);
  }

  deleteSubjectErrorImage( id: number ): Observable<SubjectErrorImage> {
    return this.http.delete<SubjectErrorImage>(`${this.baseUrl}/image-error/${id}`);
  }
}
