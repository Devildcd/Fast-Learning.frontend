import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MateriasListComponent } from './pages/materias-list/materias-list.component';
import { MateriaCreateComponent } from './pages/materia-create/materia-create.component';
import { MateriaEditComponent } from './pages/materia-edit/materia-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'materias-listado',
        component: MateriasListComponent,
      },
      {
        path: 'crear-materia',
        component: MateriaCreateComponent,
      },
      {
        path: 'editar-materia/:id',
        component: MateriaEditComponent,
      },
      {
        path: '**',
        redirectTo: 'materias-listado',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriaRoutingModule {}
