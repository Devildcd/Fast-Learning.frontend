import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';

import { ContenidosListComponent } from './pages/contenidos-list/contenidos-list.component';
import { ContenidoCreateComponent } from './pages/contenido-create/contenido-create.component';
import { ContenidoEditComponent } from './pages/contenido-edit/contenido-edit.component';
import { ContenidoShowComponent } from './pages/contenido-show/contenido-show.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'notas-generales/:id',
        component: ContenidosListComponent,
      },
      {
        path: 'funciones/:id',
        component: ContenidosListComponent,
      },
      {
        path: 'consejos/:id',
        component: ContenidosListComponent,
      },
      {
        path: 'bibliografias/:id',
        component: ContenidosListComponent,
      },
      {
        path: 'comandos/:id',
        component: ContenidosListComponent,
      },
      {
        path: 'cursos/:id',
        component: ContenidosListComponent,
      },
      {
        path: 'crear-contenido',
        component: ContenidoCreateComponent,
      },
      {
        path: 'editar-contenido/:id',
        component: ContenidoEditComponent,
      },
      {
        path: 'contenido-detalles/:id',
        component: ContenidoShowComponent,
      },
      {
        path: '**',
        redirectTo: 'contenido-listado',
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
export class ContenidosRoutingModule { }
