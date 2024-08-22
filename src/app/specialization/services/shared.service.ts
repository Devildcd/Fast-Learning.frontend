import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private elementCreatedSubject = new Subject<void>();

  elementCreated$: Observable<void> = this.elementCreatedSubject.asObservable();

  notificarElementCreated() {
    this.elementCreatedSubject.next();
  }
}
