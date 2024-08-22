import { Component, Inject } from '@angular/core';
import { SubjectExclusive } from '../../interfaces/subject-exclusive.interface';
import { Subject } from 'src/app/subject/interfaces/subject.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectExclusiveService } from '../../services/subject-exclusive.service';
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

  exclusive!: SubjectExclusive;
  subjects: Subject[] = [];
  subjectId: number = 0;
  selectedFiles!: FileList;
  selectedFileDocs!: FileList;
  previewImgs: string[] = [];
  previewDocs: string[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private exclusiveService: SubjectExclusiveService,
    private subjectService: SubjectService,
    private sharedService: SharedService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
    this.exclusiveService.getSubjectExclusive( this.data.id ).subscribe( ( exclusive ) => {
      this.exclusive = exclusive;
      console.log(exclusive)
      this.formEdit.patchValue({
        subject_id: exclusive.subject_id,
        name: exclusive.name,
        description: exclusive.description,
        availability: exclusive.availability
      });
    } );
  }

  formEdit: FormGroup = this.fb.group({
    subject_id: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    availability: ['', Validators.required]
  });

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    this.previewImages();
    console.log(this.selectedFiles)
  }

  previewImages() {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i];
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (typeof event.target?.result === 'string') {
            this.previewImgs[i] = event.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.previewImgs.splice(index, 1);
    const filesArray = Array.from(this.selectedFiles);
    filesArray.splice(index, 1);
    const dataTransfer = new DataTransfer();
    filesArray.forEach(file => {
      dataTransfer.items.add(file);
    });
    this.selectedFiles = dataTransfer.files;
    console.log(this.selectedFiles);
  }

  submitImages() {
    const formData = new FormData();
    formData.append('exclusive_id', this.exclusive.id!.toString());
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('path[]', this.selectedFiles[i]);
      }
    }
    this.exclusiveService.addImagesToContent(formData).subscribe(
      (response) => {
        console.log(response);
      },
    );
  }

  deleteImage( id: number ) {
    this.exclusiveService.deleteImage(id).subscribe(() => {
      this.exclusive.exclusive_images = this.exclusive.exclusive_images!.filter(image => image.id !== id); // Eliminar la imagen del array de imágenes en el objeto de contenido
    });
  }

  onFileSelectedDocs(event: any) {
    this.selectedFileDocs = event.target.files;
    this.previewDocuments();
    console.log(this.selectedFileDocs)
  }

  previewDocuments() {
    if (this.selectedFileDocs) {
      for (let i = 0; i < this.selectedFileDocs.length; i++) {
        const file = this.selectedFileDocs[i];
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (typeof event.target?.result === 'string') {
            this.previewDocs[i] = event.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeDoc(index: number) {
    this.previewDocs.splice(index, 1);
    const filesArray = Array.from(this.selectedFileDocs);
    filesArray.splice(index, 1);
    const dataTransfer = new DataTransfer();
    filesArray.forEach(file => {
      dataTransfer.items.add(file);
    });
    this.selectedFileDocs = dataTransfer.files;
    console.log(this.selectedFileDocs);
  }

  submitDoc() {
    const formData = new FormData();
    formData.append('exclusive_id', this.exclusive.id!.toString());
    if (this.selectedFileDocs && this.selectedFileDocs.length > 0) {
      for (let i = 0; i < this.selectedFileDocs.length; i++) {
        formData.append('path[]', this.selectedFileDocs[i]);
      }
    }
    this.exclusiveService.addDocToContent(formData).subscribe(
      (response) => {
        console.log(response);
      },
    );
  }

  deleteDoc( id: number ) {
    console.log(id)
    this.exclusiveService.deleteDoc(id).subscribe(() => {
      this.exclusive.exclusive_docs = this.exclusive.exclusive_docs!.filter(doc => doc.id !== id); // Eliminar la imagen del array de imágenes en el objeto de contenido
    });
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
    const exclusive = this.formEdit.value;
    this.exclusiveService.putSubjectExclusive( this.data.id, exclusive ).subscribe( ( exclusive ) => {
      this.sharedService.notificarElementCreated();
      this.submitImages();
      this.submitDoc();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        showConfirmButton: false,
        timer: 1000,
      });
    } )
  }
}
