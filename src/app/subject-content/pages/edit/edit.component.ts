import { Component, Inject } from '@angular/core';
import { SubjectContent } from '../../interfaces/subject-content.interface';
import { ContentLevel } from 'src/app/content-level/interfaces/content-level.interface';
import { ContentType } from 'src/app/content-type/interfaces/content-type.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectContentService } from '../../services/subject-content.service';
import { ContentLevelService } from 'src/app/content-level/services/content-level.service';
import { ContentTypesService } from 'src/app/content-type/services/content-types.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Subject } from 'src/app/subject/interfaces/subject.interface';
import { SubjectService } from 'src/app/subject/services/subject.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  content!: SubjectContent;
  subjects: Subject[] = [];
  levels: ContentLevel[] = [];
  types: ContentType[] = [];
  selectedFiles!: FileList;
  selectedFileDocs!: FileList;
  previewImgs: string[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private contentService: SubjectContentService,
    private subjectService: SubjectService,
    private contentLevelService: ContentLevelService,
    private contentTypeService: ContentTypesService,
    private sharedService: SharedService,
    private spinnerService: SpinnerService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
    this.contentLevelService.getContentLevels().subscribe((levels) => {
      this.levels = levels;
    });
    this.contentTypeService.getContentTypes().subscribe((types) => {
      this.types = types;
    });

    this.contentService.getSubjectContent( this.data.id ).subscribe( ( content ) => {
      this.content = content;
      this.spinnerService.setLoadingCompleted(true);
      console.log(content)
      this.formEdit.patchValue({
        subject_id: content.subject_id,
        content_level_id: content.content_level_id,
        content_type_id: content.content_type_id,
        name: content.name,
        usage_level: content.usage_level,
        description: content.description,
      });
    } );
  }

  formEdit: FormGroup = this.fb.group({
    subject_id: ['', Validators.required],
    content_level_id: ['', Validators.required],
    content_type_id: ['', Validators.required],
    name: ['', Validators.required], 
    usage_level: ['', Validators.required],
    description: ['', Validators.required],
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
    formData.append('subject_content_id', this.content.id!.toString());
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('path[]', this.selectedFiles[i]);
      }
    }
    this.contentService.addImagesToContent(formData).subscribe(
      (response) => {
        console.log(response);
      },
    );
  }

  deleteImage( id: number ) {
    this.contentService.deleteImage(id).subscribe(() => {
      this.content.subject_content_images = this.content.subject_content_images!.filter(image => image.id !== id); // Eliminar la imagen del array de imágenes en el objeto de contenido
    });
  }

  onFileSelectedDocs(event: any) {
    if( this.content.subject_content_docs?.length! > 0 ) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Al guardar un nuevo documento eliminarás el anterior!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: ' #ab47bc',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Sí, de acuerdo',
        cancelButtonText: 'Cancelar',
      }).then( (result) => {
        if(result.isConfirmed) {
          const docId = this.content.subject_content_docs![0].id!;
          this.contentService.deleteDoc( docId ).subscribe( 
            () => {
              console.log('Eliminado exitosamente');
              this.selectedFileDocs = event.target.files;
              console.log(this.selectedFileDocs);
            });
        }
      });
    }else{
      this.selectedFileDocs = event.target.files;
      console.log(this.selectedFileDocs);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInputDoc') as HTMLInputElement;
    fileInput.click();
  }

  submitDoc() {
    const formData = new FormData();
    formData.append('subject_content_id', this.content.id!.toString());
    if (this.selectedFileDocs && this.selectedFileDocs.length > 0) {
      for (let i = 0; i < this.selectedFileDocs.length; i++) {
        formData.append('path[]', this.selectedFileDocs[i]);
      }
    }
    this.contentService.addDocToContent(formData).subscribe(
      (response) => {
        console.log(response);
      },
    );
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
    const content = this.formEdit.value;
    this.contentService.putSubjectContent( this.data.id, content ).subscribe( ( content ) => {
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
