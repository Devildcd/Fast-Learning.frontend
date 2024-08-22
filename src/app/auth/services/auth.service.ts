import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interfaces';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  public usuario!: Usuario;
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));

  constructor( private http: HttpClient ) { }

  login(email: string, password: string): Observable<number> {

    const url = this.baseUrl + '/login';
    const body = {email, password};

    return this.http.post<AuthResponse>(url, body).pipe(
      tap( resp =>{
        console.log( resp );
        if( resp.status === 1) {
          this.usuario = {
            user: resp.user!,
          };
          localStorage.setItem( 'token', resp.access_token);
          localStorage.setItem('usuario', JSON.stringify(resp.user));
          this.tokenSubject.next(resp.access_token); // Actualizar el valor del token en el BehaviorSubject
        }
        
      } ),
      map( resp => resp.status ),
      catchError( err => of( err.error.msg ) )
    );
  }

  register(name: string, email: string, password: string): Observable<number> {
    const url = this.baseUrl + '/register';
    const body = { name, email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap(resp => {
        console.log(resp);
        if (resp.status === 1) {
          this.usuario = {
            user: resp.user!,
          };
          localStorage.setItem('token', resp.access_token);
          localStorage.setItem('usuario', JSON.stringify(resp.user));
          this.tokenSubject.next(resp.access_token);
        }
      }),
      map(resp => resp.status),
      catchError(err => of(err.error.msg))
    );
  }

  updateUser(name: string, email: string, password: string): Observable<Usuario> {
    const url = this.baseUrl + '/user-edit';
    const body = { name, email, password };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.put<Usuario>(url, body, { headers }).pipe(
      tap(resp => {
        this.usuario = resp;
        localStorage.setItem('usuario', JSON.stringify(resp));
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  countUsers(): Observable<number> {
    
    return this.http.get<number>( this.baseUrl + '/user-count/' );
  }

  getUserProfile(): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const url = `${this.baseUrl}/user-profile`;
    return this.http.get<Usuario>(url, {headers} );
  }

  guardarInformacionUsuario() {
    const usuario = this.usuario.user;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  isTokenValid(): Observable<boolean> {
    return this.tokenSubject.pipe(
      map(token => {
        return token !== null; // Verificar si el token todavía existe y no se ha borrado
      })
    );
  }

  logout(): Observable<any> {
    const url = this.baseUrl + '/logout';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = { headers: headers };
    
    return this.http.get(url, options).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.tokenSubject.next(null);
        Swal.fire({
          icon: 'success',
          title: 'Hasta la próxima',
          showConfirmButton: false,
          timer: 1000
        });
      }),
      catchError(err => {
        console.log(err);
        return throwError('Ha ocurrido un error en el logout');
      })
    );
  }
}
