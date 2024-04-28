import { Component } from '@angular/core';
import { Contenido } from '../../interfaces/contenido.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContenidoService } from '../../services/contenido.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/FastLearning/materias/services/shared.service';
import { ContenidoSharedService } from '../../services/contenido-shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contenido-create',
  templateUrl: './contenido-create.component.html',
  styleUrls: ['./contenido-create.component.css']
})
export class ContenidoCreateComponent {

  contenido!: Contenido;
  submitted = false;
  materiaID: number = 0;
  nombreCompartido: string = '';
  nombreSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private contenidoService: ContenidoService,
    private router: Router,
    private sharedService: SharedService,
    private contenidoSharedService: ContenidoSharedService
  ) {}

  ngOnInit() {
    this.sharedService.idUpdatedObservable.subscribe((id) => {
      if (id !== 0) { // Evitar la emisión del valor 0 si no es relevante para tu lógica
        this.materiaID = id;
        console.log(this.materiaID);
      }
    });
  }

  formCrear: FormGroup = this.fb.group({
    materia_id: [0,],
    nombre: ['', Validators.required],  
    titulo: [''],
    autor: ['',  Validators.required],
    notas: ['',  Validators.required],
    oficial: [false],
    especial: [false],
    calificacion: [null, [Validators.pattern(/^(\d+(\.5)?)?$/)]]
  });

  crearContenido() {

    if (this.formCrear.invalid || this.formCrear.untouched) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa los campos con *',
        showConfirmButton: true,
      });
      return;
    }

   const contenidoValue = { ...this.formCrear.value };
   contenidoValue.materia_id = this.materiaID;
   this.contenido = contenidoValue;
   console.log(this.contenido);

    this.contenidoService.postContenido(this.contenido).subscribe(
      (contenidoCreado) => {
        this.contenido = contenidoCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Contenido creado',
          showConfirmButton: false,
          timer: 1000,
        }); setTimeout(() => {
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
