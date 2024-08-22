import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private loadingCompletedSubject = new BehaviorSubject<boolean>(false);
  public loadingCompleted$ = this.loadingCompletedSubject.asObservable();

  setLoadingCompleted(status: boolean): void {
    this.loadingCompletedSubject.next(status);
  }
}
