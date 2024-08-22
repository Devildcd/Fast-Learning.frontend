import { Component, Inject } from '@angular/core';
import { SubjectError } from '../../interfaces/subject-error.interface';
import { Subject } from 'src/app/subject/interfaces/subject.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectErrorService } from '../../services/subject-error.service';
import { SubjectService } from 'src/app/subject/services/subject.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  error!: SubjectError;
  subjects: Subject[] = [];
  subjectId: number = 0;
  selectedFile: File | null = null;
  previewImg: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private errorService: SubjectErrorService,
    private subjectService: SubjectService,
    private sharedService: SharedService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
    this.errorService.getSubjectError( this.data.id ).subscribe( ( error ) => {
      this.error = error;
      console.log(error)
      this.formEdit.patchValue({
        subject_id: error.subject_id,
        name: error.name,
        description: error.description,
      });
    } );
  }

  formEdit: FormGroup = this.fb.group({
    subject_id: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    image: [''],
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.previewImage();
    }
  }

  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (typeof event.target?.result === 'string') {
          this.previewImg = event.target.result;
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addPhoto() {
    const formData = new FormData();
    formData.append('error_id', this.error.id!.toString());
    if (this.selectedFile ) {
      formData.append('urlImage', this.selectedFile);
    }
    this.errorService.postSubjectErrorImage(formData).subscribe(
      (response) => {
        console.log(response);
      },
    );
  }

  deletePhoto( id: number ) {
    this.errorService.deleteSubjectErrorImage(id).subscribe(() => {
      this.error.error_image = undefined;
      this.selectedFile = null;
      this.previewImg = null;
    })
  }

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
    const error = this.formEdit.value;
    this.errorService.putSubjectError( this.data.id, error ).subscribe( ( error ) => {
      this.addPhoto();
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
