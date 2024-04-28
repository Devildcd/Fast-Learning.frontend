import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contenido } from '../interfaces/contenido.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

getContenidosMateriasId( id:number ): Observable<Contenido[]> {
  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`
  // });

  return this.http.get<Contenido[]>( `${ this.baseUrl }/contenidos/${id}` );
}

getSingleContenido( id: number ): Observable<Contenido> {

  return this.http.get<Contenido>( `${this.baseUrl}/contenido/${id}` )
}

postContenido( contenido: Contenido ): Observable<Contenido> {

  return this.http.post<Contenido>( `${ this.baseUrl }/contenido`, contenido );
}

putContenido( id:number|undefined, contenido: Contenido ): Observable<Contenido> {

  return this.http.put<Contenido>( `${ this.baseUrl }/contenido/${id}`, contenido )
}

deleteContenido( id: number|undefined ): Observable<Contenido> {
  
  return this.http.delete<Contenido>( `${ this.baseUrl }/contenido/${id}` )
}

}
