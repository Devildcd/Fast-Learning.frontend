import { Component } from '@angular/core';
import { Specialization } from '../../interfaces/specialization.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializationService } from '../../services/specialization.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { Profile } from 'src/app/profile/interfaces/profile.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  specialization!: Specialization;
  profiles: Profile[] = [];
  submitted = false;

  selectedProfile!: string

  constructor(
    private fb: FormBuilder,
    private specializationService: SpecializationService,
    private profileService: ProfileService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileService.getProfiles().subscribe
    ( (profiles)=> {
      this.profiles = profiles;
    } );
  }

  formCreate: FormGroup = this.fb.group({
    profile_id: ['', Validators.required],
    name: ['', Validators.required], 
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

    this.specialization = {
      ...this.formCreate.value,
    };
    this.specializationService.postSpecialization(this.specialization).subscribe(
      (specializationCreada) => {
        this.specialization = specializationCreada;
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
