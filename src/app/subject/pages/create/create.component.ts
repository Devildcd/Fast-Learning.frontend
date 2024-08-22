import { Component } from '@angular/core';
import { Subject } from '../../interfaces/subject.interface';
import { Category } from 'src/app/category/interfaces/category.interface';
import { Profile } from 'src/app/profile/interfaces/profile.interface';
import { Specialization } from 'src/app/specialization/interfaces/specialization.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { CategoryService } from 'src/app/category/services/category.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { SpecializationService } from 'src/app/specialization/services/specialization.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  subject!: Subject;
  specializations: Specialization[] = [];
  selectedFile: File | null = null;
  previewImg: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private categoryService: CategoryService,
    private profileService: ProfileService,
    private specializationService: SpecializationService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.specializationService.getSpecializations().subscribe((specializations) => {
      this.specializations = specializations;
    });
  }

  formCreate: FormGroup = this.fb.group({
    specialization_id: ['', Validators.required],
    title: ['', Validators.required], 
    description: ['', Validators.required],
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
    formData.append('category_id', this.formCreate.get('category_id')?.value);
    formData.append('profile_id', this.formCreate.get('profile_id')?.value);
    formData.append('specialization_id', this.formCreate.get('specialization_id')?.value);
    formData.append('title', this.formCreate.get('title')?.value);
    formData.append('description', this.formCreate.get('description')?.value);
    
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.subjectService.postSubject(formData).subscribe(
      (subjectCreate) => {
        this.subject = subjectCreate;
        this.sharedService.notificarElementCreated();
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          // this.router.navigate(['/nomencladores/divisiones/detalles/provincia', this.rama.id]);
        }, 1000);
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
