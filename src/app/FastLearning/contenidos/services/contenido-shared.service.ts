import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoSharedService {

  public nombreUpdatedSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public nombreUpdatedObservable: Observable<string> = this.nombreUpdatedSubject.asObservable();
  
  updateId(nombre: string) {
    this.nombreUpdatedSubject.next(nombre);
  }

}
