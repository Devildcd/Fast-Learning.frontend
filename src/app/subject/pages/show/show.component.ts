import { Component, Inject } from '@angular/core';
import { Subject } from '../../interfaces/subject.interface';
import { SubjectService } from '../../services/subject.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  subject!: Subject;
  loading = true;

  constructor(
    private subjectService: SubjectService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.subjectService.getSubject( this.data.id ).subscribe( ( subject ) => {
      this.subject = subject;
      this.loading = false;
      console.log(subject)
    } ) ;
  }
}
