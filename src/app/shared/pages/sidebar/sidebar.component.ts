import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SubjectIdSourceService } from 'src/app/subject/services/subject-id-source.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  home = false;
  subject = false;
  url: string =  '';
  filteredMenuItems: { path: string; icon: string; label: string; }[] = [];
  // Obtener el id de la materia para mostrarla en las rutas q lo lleven
  subjectId: number = 0;
  
  menuItems = [
    { path: '/inicio/bienvenido', icon: 'fas fa-th', label: 'Inicio' },
    { path: '/auth/usuarios', icon: 'fas fa-user', label: 'Usuarios' },
    { path: '/categorias/listado', icon: 'fas fa-list', label: 'Categorias' },
    { path: '/perfiles/listado', icon: 'fas fa-certificate', label: 'Perfiles' },
    { path: '/especializaciones/listado', icon: 'fas fa-sitemap', label: 'Especializaciones' },
    { path: '/materias/listado', icon: 'fas fa-book-open', label: 'Materias' },
    { path: '/contenido-niveles/listado', icon: 'fas fa-thermometer-quarter', label: 'Nivel del Contenido' },
    { path: '/contenido-tipos/listado', icon: 'fas fa-th-list', label: 'Tipo de Contenido' },
    { path: '/contenidos/listado/:id', icon: 'fas fa-book', label: 'Cuaderno de Notas' },
    { path: '/bibliografias/listado/:id', icon: 'fas fa-link', label: 'Bibliografias' },
    { path: '/errores/listado/:id', icon: 'fas fa-exclamation-triangle', label: 'Errores' },
    { path: '/contenidos-exclusivos/listado/:id', icon: 'fas fa-gem', label: 'Contenidos Exclusivos' },
    { path: '/archivos/listado/:id', icon: 'fas fa-graduation-cap', label: 'Archivos' }
  ];

  private readonly homePaths = [
    '/inicio/bienvenido',
    '/auth/usuarios',
    '/categorias/listado',
    '/perfiles/listado',
    '/especializaciones/listado',
    '/materias/listado'
  ];

  // Definir las rutas que deben activar la variable 'subject'
  private readonly subjectPaths = [
    '/contenido-niveles/listado',
    '/contenido-tipos/listado',
    '/contenidos/listado',
    '/bibliografias/listado',
    '/errores/listado',
    '/contenidos-exclusivos/listado',
    '/archivos/listado'
  ];

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private subjectIdSourceService: SubjectIdSourceService,) { }

  ngOnInit(): void {
    this.subjectIdSourceService.currentSubjectId.subscribe(id => {
      this.subjectId = id;
      console.log(this.subjectId)
    });
    this.activatedRoute.url.subscribe(urlSegments => {
      this.url = this.router.url;
      console.log(this.url);
      this.checkRoute()
    });
  }

  checkRoute(): void {
    const isIncludedHome = this.homePaths.some(path => this.url.includes(path));
    const isIncludedSubject = this.subjectPaths.some(path => this.url.includes(path));

    this.home = isIncludedHome;
    this.subject = isIncludedSubject;

    // Filtrar menuItems basado en home y subject
    if (this.home) {
      this.filteredMenuItems = this.menuItems.filter(item => this.homePaths.includes(item.path));
    } else if (this.subject) {
      this.filteredMenuItems = this.menuItems
        .filter(item => this.subjectPaths.some(subjectPath => item.path.includes(subjectPath)))
        .map(item => ({
          ...item,
          path: item.path.replace(':id', String(this.subjectId))
        }));
    } else {
      this.filteredMenuItems = [];
    }
  }

  navigateTo(item: any) {
    if (item.path.includes(':id')) {
      const dynamicId = this.subjectId;  //  ID dinámico que utilizo
      const dynamicPath = item.path.replace(':id', dynamicId.toString());
      this.router.navigate([dynamicPath]);
    } else {
      this.router.navigate([item.path]);
    }
  }

}
