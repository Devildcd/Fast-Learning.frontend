import { Component } from '@angular/core';
import { Profile } from '../../interfaces/profile.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/category/interfaces/category.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  selectedOption: string = 'web';
  profile!: Profile;
  categories: Category[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe
  ( (categories) => {
    this.categories = categories;
  } );
  }

  formCreate: FormGroup = this.fb.group({
    category_id: [null, Validators.required],
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

    this.profile = {
      ...this.formCreate.value,
    };
    this.profileService.postProfile(this.profile).subscribe(
      (profileCreado) => {
        this.profile = profileCreado;
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
