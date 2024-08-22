import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RegisterComponent } from './pages/register/register.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';



@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    RegisterComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule, 
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

  ]
})
export class AuthModule { }
