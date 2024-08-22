import { Component } from '@angular/core';
import { SubjectError } from '../../interfaces/subject-error.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectErrorService } from '../../services/subject-error.service';
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

  error!: SubjectError;
  subjectId: number = 0;
  selectedFile: File | null = null;
  previewImg: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private errorService: SubjectErrorService,
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

  removeSelectedFile() {
    this.selectedFile = null;
    this.previewImg = null;
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
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
    formData.append('subject_id', this.formCreate.get('subject_id')?.value);
    formData.append('name', this.formCreate.get('name')?.value);
    formData.append('description', this.formCreate.get('description')?.value);
    
    if (this.selectedFile) {
      formData.append('errorImage', this.selectedFile);
    }
    this.errorService.postSubjectError(formData).subscribe(
      (elementCreate) => {
        this.error = elementCreate;
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
