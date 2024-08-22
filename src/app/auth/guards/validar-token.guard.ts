import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor( private router: Router, private authService: AuthService ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getToken().pipe(
      take(1),
      map(token => {
        if (token) {
          // Token válido, permitir acceso a la ruta
          return true;
        } else {
          // Token inválido, redirigir al componente de inicio de sesión
          this.router.navigateByUrl('/auth/login');
          return false;
        }
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.authService.getToken().pipe(
      take(1),
      map(token => {
        if (token) {
          // Token válido, permitir acceso a la ruta
          return true;
        } else {
          // Token inválido, redirigir al componente de inicio de sesión
          this.router.navigateByUrl('/auth/login');
          return false;
        }
      })
    );
  }
}
