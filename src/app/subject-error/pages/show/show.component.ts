import { Component, Inject } from '@angular/core';
import { SubjectError } from '../../interfaces/subject-error.interface';
import { SubjectErrorService } from '../../services/subject-error.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  error!: SubjectError;
  loading = true;

  constructor(
    private errorService: SubjectErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.errorService.getSubjectError( this.data.id ).subscribe( ( error ) => {
      this.error = error;
      this.loading = false;
      console.log(error)
    } ) ;
  }
}
