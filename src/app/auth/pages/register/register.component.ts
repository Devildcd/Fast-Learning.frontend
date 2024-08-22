import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miForm: FormGroup = this.fb.group({
    name: ['',[ Validators.required] ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
  });

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    console.log(this.miForm.value);
    const { name, email, password } = this.miForm.value;
    
    this.authService.register(name, email, password).subscribe((valido) => {
      console.log(valido);
      if (valido === 1) {
        Swal.fire({
          title: '¡Bienvenido!',
          text: '¡Inicio de sesión exitoso!',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        });
        this.router.navigateByUrl('/cursos/listado');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Revise sus credenciales de registro!',
          text: 'El correo no puede repetirse.',
        }) 
      } 
    });
  }
}
