import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentLevel } from '../interfaces/content-level.interface';

@Injectable({
  providedIn: 'root'
})
export class ContentLevelService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getContentLevels(): Observable<ContentLevel[]> {
    return this.http.get<ContentLevel[]>(`${this.baseUrl}/levels`);
  }

  getContentLevel(level: ContentLevel): Observable<ContentLevel> {
    return this.http.get<ContentLevel>(`${this.baseUrl}/level/${level}`);
  }

  postContentLevel(level: ContentLevel): Observable<ContentLevel> {
    return this.http.post<ContentLevel>(`${this.baseUrl}/level`, level);
  }

  putContentLevel(id: number, level: ContentLevel): Observable<ContentLevel> {
    return this.http.put<ContentLevel>(`${this.baseUrl}/level/${id}`, level);
  }

  deleteContentLevel( id: number ): Observable<ContentLevel> {
    return this.http.delete<ContentLevel>(`${this.baseUrl}/level/${id}`);
  }
}
