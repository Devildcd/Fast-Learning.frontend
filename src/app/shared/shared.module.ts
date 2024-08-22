import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';


@NgModule({
  declarations: [

    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
