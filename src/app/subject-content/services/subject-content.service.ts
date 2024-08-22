import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubjectContent, SubjectContentDocs, SubjectContentImages } from '../interfaces/subject-content.interface';
import { Subject } from 'src/app/subject/interfaces/subject.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectContentService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getSubjectContents(subjectId: number): Observable<SubjectContent[]> {
    return this.http.get<SubjectContent[]>(`${this.baseUrl}/contents/${subjectId}`);
  }

  getSubjectContent(content: SubjectContent): Observable<SubjectContent> {
    return this.http.get<SubjectContent>(`${this.baseUrl}/content/${content}`);
  }

  filterSubjectContents(subjectId?: number, levelId?: number, typeId?: number): Observable<SubjectContent[]> {
    const params: any = {};
    if (subjectId) {
      params.subjects = subjectId.toString();
    }
    if (levelId) {
      params.content_levels = levelId.toString();
    }
    if (typeId) {
      params.content_types = typeId.toString();
    }
   
    return this.http.get<SubjectContent[]>(`${this.baseUrl}/content-filter`, { params });
  }

  postSubjectContent(form: FormData): Observable<SubjectContent> {
    return this.http.post<SubjectContent>(`${this.baseUrl}/content`, form);
  }

  putSubjectContent(id: number, content: SubjectContent): Observable<SubjectContent> {
    return this.http.put<SubjectContent>(`${this.baseUrl}/content/${id}`, content);
  }

  deleteSubjectContent( id: number ): Observable<SubjectContent> {
    return this.http.delete<SubjectContent>(`${this.baseUrl}/content/${id}`);
  }

  addImagesToContent( formData: FormData): Observable<SubjectContentImages> {
    return this.http.post<SubjectContentImages>(`${this.baseUrl}/image-content`, formData);
  }

  deleteImage( id: number ): Observable<SubjectContentImages> {
    return this.http.delete<SubjectContentImages>(`${this.baseUrl}/image-content/${id}`);
  }

  deleteAllImages(contentId: number): Observable<SubjectContentImages> {
    return this.http.delete<SubjectContentImages>(`${this.baseUrl}/delete-all-images-content/${contentId}`);
  }

  addDocToContent( formData: FormData): Observable<SubjectContentDocs> {
    return this.http.post<SubjectContentDocs>(`${this.baseUrl}/doc-content`, formData);
  }

  deleteDoc( id: number ): Observable<SubjectContentDocs> {
    return this.http.delete<SubjectContentDocs>(`${this.baseUrl}/doc-content/${id}`);
  }
}
