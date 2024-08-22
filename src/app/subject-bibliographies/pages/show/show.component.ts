import { Component, Inject } from '@angular/core';
import { SubjectBibliographies } from '../../interfaces/subject-bibliographies.interface';
import { SubjectBibliographiesService } from '../../services/subject-bibliographies.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  bibliography!: SubjectBibliographies;
  loading = true;

  constructor(
    private bibliographyService: SubjectBibliographiesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.bibliographyService.getSubjectBibliography( this.data.id ).subscribe( ( bibliography ) => {
      this.bibliography = bibliography;
      this.loading = false;
      console.log(bibliography)
    } ) ;
  }
}
