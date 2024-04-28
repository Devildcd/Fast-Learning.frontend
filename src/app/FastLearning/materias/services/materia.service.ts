import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Materia } from '../interfaces/materia.interface';
import { Observable } from 'rxjs';
import { Contenido } from '../../contenidos/interfaces/contenido.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getMaterias(): Observable<Materia[]> {

    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });
    return this.http.get<Materia[]>( `${ this.baseUrl}/materias` );
  }

  getSingleMateria( id: number ): Observable<Materia> {

    return this.http.get<Materia>( `${this.baseUrl}/materia/${id}` )
  }

  postMateria( formData: FormData ): Observable<Materia> {

    return this.http.post<Materia>( `${ this.baseUrl }/materia`, formData );
  }

  putMateria( id:number|undefined, materia: Materia ): Observable<Materia> {

    return this.http.put<Materia>( `${ this.baseUrl }/materia/${id}`, materia )
  }

  deleteMateria( id: number|undefined ): Observable<Materia> {
    
    return this.http.delete<Materia>( `${ this.baseUrl }/materia/${id}` )
  }
  
}
