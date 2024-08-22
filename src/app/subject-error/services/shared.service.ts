import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private elementCreatedSubject = new Subject<void>();

  private imageAddedSubject = new Subject<void>();

  elementCreated$: Observable<void> = this.elementCreatedSubject.asObservable();
  imageAdded$: Observable<void> = this.imageAddedSubject.asObservable();

  notificarElementCreated() {
    this.elementCreatedSubject.next();
  }
}
