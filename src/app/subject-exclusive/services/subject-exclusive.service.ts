import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExclusiveDocs, ExclusiveImages, SubjectExclusive } from '../interfaces/subject-exclusive.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectExclusiveService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getSubjectExclusives(subjectId: number): Observable<SubjectExclusive[]> {
    return this.http.get<SubjectExclusive[]>(`${this.baseUrl}/exclusives/${subjectId}`);
  }

  getSubjectExclusive(exclusive: SubjectExclusive): Observable<SubjectExclusive> {
    return this.http.get<SubjectExclusive>(`${this.baseUrl}/exclusive/${exclusive}`);
  }

  postSubjectExclusive( formData:FormData ): Observable<SubjectExclusive> {
    return this.http.post<SubjectExclusive>(`${this.baseUrl}/exclusive`, formData);
  }

  putSubjectExclusive(id: number, exclusive: SubjectExclusive): Observable<SubjectExclusive> {
    return this.http.put<SubjectExclusive>(`${this.baseUrl}/exclusive/${id}`, exclusive);
  }

  deleteSubjectExclusive( id: number ): Observable<SubjectExclusive> {
    return this.http.delete<SubjectExclusive>(`${this.baseUrl}/exclusive/${id}`);
  }

  addImagesToContent( formData: FormData): Observable<ExclusiveImages> {
    return this.http.post<ExclusiveImages>(`${this.baseUrl}/image-exclusive`, formData);
  }

  deleteImage( id: number ): Observable<ExclusiveImages> {
    return this.http.delete<ExclusiveImages>(`${this.baseUrl}/image-exclusive/${id}`);
  }

  deleteAllImages(contentId: number): Observable<ExclusiveImages> {
    return this.http.delete<ExclusiveImages>(`${this.baseUrl}/delete-all-images-exclusive/${contentId}`);
  }

  addDocToContent( formData: FormData): Observable<ExclusiveDocs> {
    return this.http.post<ExclusiveDocs>(`${this.baseUrl}/doc-exclusive`, formData);
  }

  deleteDoc( id: number ): Observable<ExclusiveDocs> {
    return this.http.delete<ExclusiveDocs>(`${this.baseUrl}/doc-exclusive/${id}`);
  }
}
