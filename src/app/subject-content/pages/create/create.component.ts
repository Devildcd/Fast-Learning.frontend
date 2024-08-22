import { Component } from '@angular/core';
import { SubjectContent } from '../../interfaces/subject-content.interface';
import { ContentLevel } from 'src/app/content-level/interfaces/content-level.interface';
import { ContentType } from 'src/app/content-type/interfaces/content-type.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectContentService } from '../../services/subject-content.service';
import { ContentLevelService } from 'src/app/content-level/services/content-level.service';
import { ContentTypesService } from 'src/app/content-type/services/content-types.service';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubjectIdSourceService } from 'src/app/subject/services/subject-id-source.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  content!: SubjectContent;
  subjectId: number = 0;
  levels: ContentLevel[] = [];
  types: ContentType[] = [];
  activeExample = false;
  selectedFiles!: FileList;
  selectedFileDocs!: FileList;
  previewImgs: string[] = [];
  previewDocs: string[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private contentService: SubjectContentService,
    private subjectIdSourceService: SubjectIdSourceService,
    private contentLevelService: ContentLevelService,
    private contentTypeService: ContentTypesService,
    private sharedService: SharedService,
    private activeRoute: ActivatedRoute,
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
    this.contentLevelService.getContentLevels().subscribe((levels) => {
      this.levels = levels;
    });
    this.contentTypeService.getContentTypes().subscribe((types) => {
      this.types = types;
    });
  }

  formCreate: FormGroup = this.fb.group({
    subject_id: ['', Validators.required],
    content_level_id: ['', Validators.required],
    content_type_id: ['', Validators.required],
    name: ['', Validators.required], 
    usage_level: ['', Validators.required],
    description: ['', Validators.required],
    example: ['']
  });

  onCheckboxChange(event: any) {
    this.activeExample = event.checked;
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    this.previewImages();
    console.log(this.selectedFiles)
  }

  onFileSelectedDocs(event: any) {
    this.selectedFileDocs = event.target.files;
    console.log(this.selectedFileDocs)
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInputDoc') as HTMLInputElement;
    fileInput.click();
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
    formData.append('content_level_id', this.formCreate.value.content_level_id);
    formData.append('content_type_id', this.formCreate.value.content_type_id);
    formData.append('name', this.formCreate.value.name);
    formData.append('usage_level', this.formCreate.value.usage_level);
    formData.append('description', this.formCreate.value.description);
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('subjectContentImages[]', this.selectedFiles[i]);
      }
    }
    if (this.selectedFileDocs && this.selectedFileDocs.length > 0) {
      for (let i = 0; i < this.selectedFileDocs.length; i++) {
        formData.append('subjectContentDocs[]', this.selectedFileDocs[i]);
      }
    }
    this.contentService.postSubjectContent(formData).subscribe(
      (elementCreate) => {
        this.content = elementCreate;
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
