import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from '../../services/materia.service';
import { Materia } from '../../interfaces/materia.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materia-create',
  templateUrl: './materia-create.component.html',
  styleUrls: ['./materia-create.component.css']
})
export class MateriaCreateComponent {

  selectedFiles!: FileList;
  previewImgs: string[] = [];
  materia!: Materia;

  constructor(
    private fb: FormBuilder,
    private materiaService: MateriaService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    nombre: ['', Validators.required], 
    descripcion: ['', Validators.required]
  });

  guardarMateria() {
    const formData = new FormData();
    formData.append('nombre', this.formCrear.value.nombre);
    formData.append('descripcion', this.formCrear.value.descripcion);
    console.log(formData)
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    
    // if (this.selectedFiles && this.selectedFiles.length > 0) {
    //   for (let i = 0; i < this.selectedFiles.length; i++) {
    //     formData.append('foto[]', this.selectedFiles[i]);
    //   }
    // }
    this.materiaService.postMateria(formData).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Contenido creado',
          showConfirmButton: false
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      error => {
        console.log('Error:', error);
        if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: '¡Tu sesión ha expirado!',
            text: 'Por favor, vuelve a iniciar sesión',
            showConfirmButton: false,
            timer: 1000 
          }).then(() => {
            this.router.navigateByUrl('/auth/login');
          });
        }
      }
    );
  }

}
