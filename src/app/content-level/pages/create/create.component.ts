import { Component } from '@angular/core';
import { ContentLevel } from '../../interfaces/content-level.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentLevelService } from '../../services/content-level.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  level!: ContentLevel;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private contentLevelService: ContentLevelService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  formCreate: FormGroup = this.fb.group({
    name: ['Basico', Validators.required], 
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

    this.level = {
      ...this.formCreate.value,
    };
    this.contentLevelService.postContentLevel(this.level).subscribe(
      (levelCreada) => {
        this.level = levelCreada;
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
