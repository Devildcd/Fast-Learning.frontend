import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseUrl}/profiles`);
  }

  getProfile(profile: Profile): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/profile/${profile}`);
  }

  filterProfiles(categoryId?: number): Observable<Profile[]> {
    const params: any = {};
    if (categoryId) {
      params.categories = categoryId.toString();
    }
    return this.http.get<Profile[]>(`${this.baseUrl}/profile-filter`, { params });
  }

  postProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.baseUrl}/profile`, profile);
  }

  putProfile(id: number, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/profile/${id}`, profile);
  }

  deleteProfile( id: number ): Observable<Profile> {
    return this.http.delete<Profile>(`${this.baseUrl}/profile/${id}`);
  }
}
