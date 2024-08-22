import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';

const routes: Routes = [

  // Lazy load
  {
    path: 'inicio',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  {
    path: 'categorias',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },

  {
    path: 'perfiles',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },

  {
    path: 'especializaciones',
    loadChildren: () => import('./specialization/specialization.module').then(m => m.SpecializationModule)
  },

  {
    path: 'materias',
    loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)
  },

  {
    path: 'contenido-niveles',
    loadChildren: () => import('./content-level/content-level.module').then(m => m.ContentLevelModule)
  },

  {
    path: 'contenido-tipos',
    loadChildren: () => import('./content-type/content-type.module').then(m => m.ContentTypeModule)
  },

  {
    path: 'contenidos',
    loadChildren: () => import('./subject-content/subject-content.module').then(m => m.SubjectContentModule)
  },

  {
    path: 'bibliografias',
    loadChildren: () => import('./subject-bibliographies/subject-bibliographies.module').then(m => m.SubjectBibliographiesModule)
  },

  {
    path: 'errores',
    loadChildren: () => import('./subject-error/subject-error.module').then(m => m.SubjectErrorModule)
  },

  {
    path: 'contenidos-exclusivos',
    loadChildren: () => import('./subject-exclusive/subject-exclusive.module').then(m => m.SubjectExclusiveModule)
  },

  {
    path: 'archivos',
    loadChildren: () => import('./archive/archive.module').then(m => m.ArchiveModule)
  },

  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule )
  // },
  {
    path: '**', redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
