import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  EditmiForm: FormGroup = this.fb.group({
    name: ['',[ Validators.required] ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
  });

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {

    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.authService.usuario = {
        user: usuarioObj,
      };
      this.EditmiForm.setValue({
        name: usuarioObj.name,
        email: usuarioObj.email,
        password: '',
      });
    }
  console.log(this.authService.usuario?.user);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  updateUser() {
    const name = this.EditmiForm.get('name')?.value;
    const email = this.EditmiForm.get('email')?.value;
    const password = this.EditmiForm.get('password')?.value;

    this.authService.updateUser(name, email, password).subscribe(
      user => {
        console.log('Usuario actualizado:', user);
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}

