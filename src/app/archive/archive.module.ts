import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { ArchiveRoutingModule } from './archive-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { DocPipe } from './pipes/doc.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    DocPipe
  ],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class ArchiveModule { }
