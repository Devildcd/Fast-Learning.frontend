import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subjectSource = new BehaviorSubject<boolean>(false);
  subject$ = this.subjectSource.asObservable();

  setSubject(value: boolean) {
    this.subjectSource.next(value);
  }
}
