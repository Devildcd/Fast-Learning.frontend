import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentType } from '../interfaces/content-type.interface';

@Injectable({
  providedIn: 'root'
})
export class ContentTypesService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getContentTypes(): Observable<ContentType[]> {
    return this.http.get<ContentType[]>(`${this.baseUrl}/types`);
  }

  getContentType(type: ContentType): Observable<ContentType> {
    return this.http.get<ContentType>(`${this.baseUrl}/type/${type}`);
  }

  postContentType(type: ContentType): Observable<ContentType> {
    return this.http.post<ContentType>(`${this.baseUrl}/type`, type);
  }

  putContentType(id: number, type: ContentType): Observable<ContentType> {
    return this.http.put<ContentType>(`${this.baseUrl}/type/${id}`, type);
  }

  deleteContentType( id: number ): Observable<ContentType> {
    return this.http.delete<ContentType>(`${this.baseUrl}/type/${id}`);
  }
}
