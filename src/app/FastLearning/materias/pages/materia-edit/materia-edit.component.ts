import { Component } from '@angular/core';
import { Materia } from '../../interfaces/materia.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from '../../services/materia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materia-edit',
  templateUrl: './materia-edit.component.html',
  styleUrls: ['./materia-edit.component.css']
})
export class MateriaEditComponent {

  materia!: Materia
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private materiaService: MateriaService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  formEditar: FormGroup = this.fb.group({
    nombre: ['', Validators.required], 
    descripcion: ['', Validators.required]
  });

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.materiaService.getSingleMateria( id ))
      )
      .subscribe((materia) => {
        this.materia = materia;
        this.loading = false;
        console.log( materia )
        // console.log( materia.imagenes );
        this.formEditar.setValue({
          nombre: materia.nombre,
          descripcion: materia.descripcion,
        });
      });
  }

  editarMateria() {

    if ( this.formEditar.untouched ) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, modifique algún campo',
        showConfirmButton: true,
      });
      return;
    }
    const materia = this.formEditar.value;
    this.materiaService.putMateria( this.materia.id, materia ).subscribe(
      updatedContent => {
        console.log( updatedContent );
        // this.saveImages();
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Contenido actualizado',
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(() => {
          this.router.navigate(['/materias/materias-listado']);
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
