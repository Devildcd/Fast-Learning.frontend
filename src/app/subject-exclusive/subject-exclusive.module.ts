import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectExclusiveRoutingModule } from './subject-exclusive-routing.module';
import { DocPipe } from './pipes/doc.pipe';
import { ImgPipe } from './pipes/img.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,
    DocPipe,
    ImgPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SubjectExclusiveRoutingModule
  ]
})
export class SubjectExclusiveModule { }
