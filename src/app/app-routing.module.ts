import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';

const routes: Routes = [
  
  // Lazy load
  {
    path: 'materias',
    loadChildren: () => import('./FastLearning/materias/materias.module').then( m => m.MateriasModule )
  },
  {
    path: 'contenidos',
    loadChildren: () => import('./FastLearning/contenidos/contenidos.module').then( m => m.ContenidosModule )
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule )
  // },
  {
    path: '**', redirectTo: 'materias'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
