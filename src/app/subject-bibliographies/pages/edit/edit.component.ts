import { Component, Inject } from '@angular/core';
import { SubjectBibliographies } from '../../interfaces/subject-bibliographies.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectBibliographiesService } from '../../services/subject-bibliographies.service';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/subject/interfaces/subject.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectService } from 'src/app/subject/services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  bibliography!: SubjectBibliographies;
  subjects: Subject[] = [];
  subjectId: number = 0;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private bibliographyService: SubjectBibliographiesService,
    private subjectService: SubjectService,
    private sharedService: SharedService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
    this.bibliographyService.getSubjectBibliography( this.data.id ).subscribe( ( bibliography ) => {
      this.bibliography = bibliography;
      console.log(bibliography)
      this.formEdit.patchValue({
        subject_id: bibliography.subject_id,
        url: bibliography.url,
        type: bibliography.type,
        description: bibliography.description
      });
    } );
  }

  formEdit: FormGroup = this.fb.group({
    subject_id: ['', Validators.required],
    url: ['', Validators.required], 
    type: [false],
    description: ['', Validators.required],
  });

  onEdit() {
    if( this.formEdit.untouched ) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, modifique algún campo',
        showConfirmButton: true
      });
      return;
    }
    const bibliography = this.formEdit.value;
    this.bibliographyService.putSubjectBibliography( this.data.id, bibliography ).subscribe( ( bibliography ) => {
      this.sharedService.notificarElementCreated();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        showConfirmButton: false,
        timer: 1000,
      });
    } )
  }
}
