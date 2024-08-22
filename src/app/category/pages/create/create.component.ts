import { Component } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  selectedOption: string = 'web';
  category!: Category;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  formCreate: FormGroup = this.fb.group({
    name: ['Web', Validators.required], 
    description: ['', Validators.required],
  });

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

    this.category = {
      ...this.formCreate.value,
    };
    this.categoryService.postCategory(this.category).subscribe(
      (categoryCreada) => {
        this.category = categoryCreada;
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
