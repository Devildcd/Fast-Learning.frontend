import { Component } from '@angular/core';
import { SubjectExclusive } from '../../interfaces/subject-exclusive.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectExclusiveService } from '../../services/subject-exclusive.service';
import { SubjectIdSourceService } from 'src/app/subject/services/subject-id-source.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  exclusive!: SubjectExclusive;
  subjectId: number = 0;
  selectedFiles!: FileList;
  selectedFileDocs!: FileList;
  previewImgs: string[] = [];
  previewDocs: string[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private exclusiveService: SubjectExclusiveService,
    private subjectIdSourceService: SubjectIdSourceService,
    private sharedService: SharedService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subjectIdSourceService.currentSubjectId.subscribe(id => {
      this.subjectId = id;
      console.log(this.subjectId)
      // Asignar el subject_id al formulario cuando se obtiene el ID
      this.formCreate.patchValue({
        subject_id: this.subjectId
      });
    });
  }

  formCreate: FormGroup = this.fb.group({
    subject_id: ['', Validators.required],
    name: ['', Validators.required], 
    description: ['', Validators.required],
    availability: ['', Validators.required],
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

  onSubmit() {
    if (this.formCreate.invalid || this.formCreate.untouched) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa los campos con *',
        showConfirmButton: true,
      });
      return;
    }
    const formData = new FormData();
    formData.append('subject_id', this.formCreate.value.subject_id);
    formData.append('name', this.formCreate.value.name);
    formData.append('description', this.formCreate.value.description);
    formData.append('availability', this.formCreate.value.availability);
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('exclusiveImages[]', this.selectedFiles[i]);
      }
    }
    if (this.selectedFileDocs && this.selectedFileDocs.length > 0) {
      for (let i = 0; i < this.selectedFileDocs.length; i++) {
        formData.append('exclusiveDocs[]', this.selectedFileDocs[i]);
      }
    }
    this.exclusiveService.postSubjectExclusive(formData).subscribe(
      (elementCreate) => {
        this.exclusive = elementCreate;
        this.sharedService.notificarElementCreated();
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
      }
      // error => {
      //   console.log('Error:', error);
      //   if (error.error.message === 'Unauthenticated.') {
      //     Swal.fire({
      //       icon: 'error',
      //       title: '¡Tu sesión ha expirado!',
      //       text: 'Por favor, vuelve a iniciar sesión',
      //       showConfirmButton: false,
      //       timer: 1000 // Duración en milisegundos (1 segundo)
      //     }).then(() => {
      //       this.router.navigateByUrl('/auth/login');
      //     });
      //   }
      // }
    );
  }
}
