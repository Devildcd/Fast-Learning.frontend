import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import   Swal from 'sweetalert2'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  miForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  countUsers: number = 0;
  showPassword: boolean = false;

  ngOnInit() {

    this.authService.countUsers().subscribe( users => {
      this.countUsers = users;
      console.log( users );
    } )
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  

  login() {
    console.log(this.miForm.value);
    const { email, password } = this.miForm.value;
    this.authService.login(email, password).subscribe((valido) => {
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
      } else { 
        Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error'); 
      }  
    });
  }
}
