import { Component } from '@angular/core';
import { Contenido } from '../../interfaces/contenido.interface';
import { Materia } from 'src/app/FastLearning/materias/interfaces/materia.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MateriaService } from 'src/app/FastLearning/materias/services/materia.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/FastLearning/materias/services/shared.service';
import { ContenidoService } from '../../services/contenido.service';
import { switchMap } from 'rxjs';
import { ContenidoSharedService } from '../../services/contenido-shared.service';

@Component({
  selector: 'app-contenidos-list',
  templateUrl: './contenidos-list.component.html',
  styleUrls: ['./contenidos-list.component.css']
})
export class ContenidosListComponent {

  materia!: Materia;
  contenidos: Contenido[] = [];
  nombre: string = '';
  displayedColumns: string[] = [
    'select',
    'indice',
    'titulo',
  ];
  dataSource = new MatTableDataSource<Contenido>([]);
  selection = new SelectionModel<Contenido>(true, []);
  loading = true;

  constructor(
    private materiaService: MateriaService,
    private activeRoute: ActivatedRoute,
    private sharedService: SharedService,
    private contenidoService: ContenidoService,
    private contenidoSharedService: ContenidoSharedService
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.materiaService.getSingleMateria(id);
        })
      )
      .subscribe((materia) => {
        this.materia = materia;
        this.sharedService.updateId(materia.id!);
        console.log(materia);
        this.mostrarContenidosMateriaId();
      });
  }

  ngOnDestroy() {
    this.sharedService.interruptor = false; // Establecer interruptor en false al destruir el componente
  }

  mostrarContenidosMateriaId() {
    this.activeRoute.params.subscribe(params => {
      const nombreRuta = this.activeRoute.snapshot.url[0].path;
      const id = this.materia.id;

      if (nombreRuta === 'cursos') {
        this.displayedColumns.push('autor');
        this.displayedColumns.push('calificacion');
      }

      if (nombreRuta === 'bibliografias') {
        this.displayedColumns.push('oficial');
      }

      if (
        nombreRuta === 'notas-generales' ||
        nombreRuta === 'funciones' ||
        nombreRuta === 'bibliografias' ||
        nombreRuta === 'consejos' ||
        nombreRuta === 'comandos' ||
        nombreRuta === 'cursos'
      ) {
        this.displayedColumns.push('especial');
        this.displayedColumns.push('actions');
      }

      console.log(this.displayedColumns)
      
      this.contenidoService.getContenidosMateriasId(id!).subscribe((contenidos) => {
        if (nombreRuta === 'notas-generales') {
          this.contenidos = contenidos.filter(contenido => contenido.nombre === 'notaGeneral');
          this.nombre = nombreRuta.charAt(0).toUpperCase() + nombreRuta.slice(1).toLowerCase();
          this.contenidoSharedService.nombreUpdatedSubject.next(this.nombre);
          console.log(this.contenidoSharedService.nombreUpdatedSubject.value);
        } else if (nombreRuta === 'funciones') {
          this.contenidos = contenidos.filter(contenido => contenido.nombre === 'funcion');
          this.nombre = nombreRuta.charAt(0).toUpperCase() + nombreRuta.slice(1).toLowerCase();
          
        } else if (nombreRuta === 'consejos') {
          this.contenidos = contenidos.filter(contenido => contenido.nombre === 'consejo');
          this.nombre = nombreRuta.charAt(0).toUpperCase() + nombreRuta.slice(1).toLowerCase();
        } else if (nombreRuta === 'bibliografias') {
          this.contenidos = contenidos.filter(contenido => contenido.nombre === 'bibliografia');
          this.nombre = nombreRuta.charAt(0).toUpperCase() + nombreRuta.slice(1).toLowerCase();
        } else if (nombreRuta === 'comandos') {
          this.contenidos = contenidos.filter(contenido => contenido.nombre === 'comando');
          this.nombre = nombreRuta.charAt(0).toUpperCase() + nombreRuta.slice(1).toLowerCase();
        } else if (nombreRuta === 'cursos') {
          this.contenidos = contenidos.filter(contenido => contenido.nombre === 'curso');
          this.nombre = nombreRuta.charAt(0).toUpperCase() + nombreRuta.slice(1).toLowerCase();
        } else {
          // Si la ruta no coincide con ninguna de las condiciones anteriores, mostrar todos los contenidos
          this.contenidos = contenidos;
        }
        this.dataSource.data = this.contenidos;
        this.loading = false;
        console.log(this.contenidos);
      });
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Contenido): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.titulo + 1
    }`;
  }
}
