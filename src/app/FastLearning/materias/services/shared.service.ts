import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  interruptor = false;
  // private idSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // public idObservable: Observable<number> = this.idSubject.asObservable();

  private idUpdatedSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public idUpdatedObservable: Observable<number> = this.idUpdatedSubject.asObservable();

  constructor() { }

  updateId(id: number) {
    // this.idSubject.next(id);
    this.idUpdatedSubject.next(id); // Emitir el nuevo ID a través del Observable compartido
  }

}
