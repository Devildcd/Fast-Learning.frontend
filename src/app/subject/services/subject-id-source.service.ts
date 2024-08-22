import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectIdSourceService {

  constructor() { }

  // Logica para guardar el ID de la subject 
  private subjectIdSource = new BehaviorSubject<number>(this.getSubjectIdFromSessionStorage());
  currentSubjectId = this.subjectIdSource.asObservable();

  changeSubjectId(id: number) {
    sessionStorage.setItem('subjectId', id.toString()); // Convertir el número a cadena para almacenarlo en sessionStorage
    this.subjectIdSource.next(id);
  }

  private getSubjectIdFromSessionStorage(): number {
    const storedId = sessionStorage.getItem('subjectId');
    return storedId ? +storedId : 0; // Convertir de cadena a número
  }

}
