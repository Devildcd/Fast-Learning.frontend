import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubjectBibliographies } from '../interfaces/subject-bibliographies.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectBibliographiesService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getSubjectBibliographies(subjectId: number): Observable<SubjectBibliographies[]> {
    return this.http.get<SubjectBibliographies[]>(`${this.baseUrl}/bibliographies/${subjectId}`);
  }

  getSubjectBibliography(bibliography: SubjectBibliographies): Observable<SubjectBibliographies> {
    return this.http.get<SubjectBibliographies>(`${this.baseUrl}/bibliography/${bibliography}`);
  }

  postSubjectBibliography(bibliography: SubjectBibliographies): Observable<SubjectBibliographies> {
    return this.http.post<SubjectBibliographies>(`${this.baseUrl}/bibliography`, bibliography);
  }

  putSubjectBibliography(id: number, bibliography: SubjectBibliographies): Observable<SubjectBibliographies> {
    return this.http.put<SubjectBibliographies>(`${this.baseUrl}/bibliography/${id}`, bibliography);
  }

  deleteSubjectBibliography( id: number ): Observable<SubjectBibliographies> {
    return this.http.delete<SubjectBibliographies>(`${this.baseUrl}/bibliography/${id}`);
  }
}
