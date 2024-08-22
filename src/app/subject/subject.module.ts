import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';
import { CreateComponent } from './pages/create/create.component';
import { ShowComponent } from './pages/show/show.component';
import { HomeComponent } from './pages/home/home.component';
import { SubjectRoutingModule } from './subject-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgPipe } from './pipes/img.pipe';



@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    CreateComponent,
    ShowComponent,
    HomeComponent,
    ImgPipe
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SubjectModule { }
