import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
import { CreateComponent } from './pages/create/create.component';
import { ListComponent } from './pages/list/list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectErrorRoutingModule } from './subject-error-routing.module';
import { ImgPipe } from './pipes/img.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    EditComponent,
    ShowComponent,
    CreateComponent,
    ListComponent,
    ImgPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SubjectErrorRoutingModule
  ]
})
export class SubjectErrorModule { }
