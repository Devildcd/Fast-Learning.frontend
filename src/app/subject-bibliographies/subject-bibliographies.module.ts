import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
import { ListComponent } from './pages/list/list.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectBibliographiesRoutingModule } from './subject-bibliographies-routing.module';


@NgModule({
  declarations: [
  
    CreateComponent,
       EditComponent,
       ShowComponent,
       ListComponent,
       HomeComponent,
       CreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SubjectBibliographiesRoutingModule
  ]
})
export class SubjectBibliographiesModule { }
