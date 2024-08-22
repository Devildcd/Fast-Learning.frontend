import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectBibliographies } from '../../interfaces/subject-bibliographies.interface';
import { Subject } from 'src/app/subject/interfaces/subject.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SubjectService } from 'src/app/subject/services/subject.service';
import { SubjectBibliographiesService } from '../../services/subject-bibliographies.service';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { ShowComponent } from '../show/show.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  displayedColumns: string[] = ['select', 'url', 'type', 'acciones'];
  dataSource = new MatTableDataSource<SubjectBibliographies>([]);
  selection = new SelectionModel<SubjectBibliographies>(true, []);
  subject!: Subject;
  bibliographies: SubjectBibliographies[] = [];
  terminoBusqueda: string = '';
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private subjectService: SubjectService,
               private bibliographiesService: SubjectBibliographiesService,
               private sharedService: SharedService,
               private router: Router,
               private activeRoute: ActivatedRoute,
               public dialog: MatDialog ) {}

  ngOnInit() {
    this.activeRoute.params
    .pipe(switchMap(({ id }) => this.subjectService.getSubject(id)))
    .subscribe((subject) => {
      this.subject = subject;
      console.log(this.subject);
      this.onLoad();
    });

    this.sharedService.elementCreated$.subscribe(() => {
      this.onLoad();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onLoad() {
    this.bibliographiesService.getSubjectBibliographies( this.subject.id! ).subscribe(
      (bibliographies) => {
        this.bibliographies = bibliographies;
        this.dataSource.data = bibliographies;
        console.log(this.bibliographies);
        this.loading = false;
      },
      (error) => {
        if (error.status === 401) {
          // Si el error es de tipo "unauthenticated"
          Swal.fire({
            icon: 'error',
            title: 'Sesión expirada',
            text: 'Tu sesión ha expirado, por favor inicia sesión de nuevo.',
          }).then(() => {
            // Redirecciona a la página de inicio de sesión después de 1 segundo
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 1000);
          });
        }
      }
    );
  }
  // logica para el buscador
  filtrarDatos() {
    this.dataSource.data = this.bibliographies.filter(( bibliography ) => {
      // Filtra por URL
      const matchesUrl = bibliography.url.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
      // Filtra por tipo (booleano)
      let matchesType = true; 
      if (this.terminoBusqueda.toLowerCase() === 'oficial') {
          matchesType = bibliography.type === true;
      } 
      return matchesUrl || matchesType;
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.onLoad();
  }

  // logica de los dialog de material
  createBibliography() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '50%',
      disableClose: true // Esta opción evita que el diálogo se cierre haciendo clic fuera de él
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editContent( elementId: SubjectBibliographies ) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '50%',
      data: { id: elementId },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showContent( elementId: SubjectBibliographies ) {
    const dialogRef = this.dialog.open(ShowComponent, {
      data: { id: elementId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDelete( id: number ) {
    if (id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: ' #ab47bc',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.bibliographiesService.deleteSubjectBibliography( id ).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.onLoad();
              console.log('Eliminado exitosamente');
            },
            (error) => {
              if (error.status === 401) {
                // Si el error es de tipo "unauthenticated"
                Swal.fire({
                  icon: 'error',
                  title: 'Sesión expirada',
                  text: 'Tu sesión ha expirado, por favor inicia sesión de nuevo.',
                }).then(() => {
                  // Redirecciona a la página de inicio de sesión después de 1 segundo
                  setTimeout(() => {
                    this.router.navigate(['/auth/login']);
                  }, 1000);
                });
              }
            }
          );
        }
      });
    }
  }


  // logica de la tabla de material
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
  checkboxLabel(row?: SubjectBibliographies): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.url + 1}`;
  }

  //logica del paginador
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
