import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Archive } from '../interfaces/archive.interface';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getArchives( subjectId: number ): Observable<Archive[]> {
    return this.http.get<Archive[]>(`${this.baseUrl}/doc-archives/${subjectId}`);
  }

  addDocToSubject( formData: FormData): Observable<Archive> {
    return this.http.post<Archive>(`${this.baseUrl}/doc-archive`, formData);
  }

  deleteDoc( id: number ): Observable<Archive> {
    return this.http.delete<Archive>(`${this.baseUrl}/doc-archive/${id}`);
  }
}
