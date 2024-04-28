import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasListComponent } from './pages/materias-list/materias-list.component';
import { HomeComponent } from './pages/home/home.component';
import { MateriaRoutingModule } from './materia-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MateriaCreateComponent } from './pages/materia-create/materia-create.component';
import { MateriaEditComponent } from './pages/materia-edit/materia-edit.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MateriasListComponent,
    HomeComponent,
    MateriaCreateComponent,
    MateriaEditComponent,
  ],
  imports: [
    CommonModule,
    MateriaRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class MateriasModule { }
