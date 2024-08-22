import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowComponent } from './pages/show/show.component';
import { ListComponent } from './pages/list/list.component';
import { SubjectContentRoutingModule } from './subject-content-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgPipe } from './pipes/img.pipe';
import { DocPipe } from './pipes/doc.pipe';



@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    HomeComponent,
    ShowComponent,
    ListComponent,
    ImgPipe,
    DocPipe
  ],
  imports: [
    CommonModule,
    SubjectContentRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SubjectContentModule { }
