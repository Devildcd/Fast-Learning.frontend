import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidosListComponent } from './pages/contenidos-list/contenidos-list.component';
import { ContenidoCreateComponent } from './pages/contenido-create/contenido-create.component';
import { ContenidoEditComponent } from './pages/contenido-edit/contenido-edit.component';
import { ContenidoShowComponent } from './pages/contenido-show/contenido-show.component';
import { ContenidosRoutingModule } from './contenidos-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ContenidosListComponent,
    ContenidoCreateComponent,
    ContenidoEditComponent,
    ContenidoShowComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ContenidosRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ContenidosModule { }
