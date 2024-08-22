import { Component } from '@angular/core';
import { SubjectBibliographies } from '../../interfaces/subject-bibliographies.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectIdSourceService } from 'src/app/subject/services/subject-id-source.service';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubjectBibliographiesService } from '../../services/subject-bibliographies.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  bibliography!: SubjectBibliographies;
  subjectId: number = 0;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private bibliographyService: SubjectBibliographiesService,
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
    url: ['', Validators.required], 
    type: [false],
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

    this.bibliography = {
      ...this.formCreate.value,
    };
    console.log(this.bibliography);
    this.bibliographyService.postSubjectBibliography(this.bibliography).subscribe(
      (elementCreate) => {
        this.bibliography = elementCreate;
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
