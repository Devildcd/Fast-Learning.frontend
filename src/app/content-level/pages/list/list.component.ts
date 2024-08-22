import { Component, ViewChild } from '@angular/core';
import { ContentLevel } from '../../interfaces/content-level.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ContentLevelService } from '../../services/content-level.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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

  displayedColumns: string[] = ['select', 'name', 'description', 'acciones'];
  dataSource = new MatTableDataSource<ContentLevel>([]);
  selection = new SelectionModel<ContentLevel>(true, []);
  levels: ContentLevel[] = [];
  terminoBusqueda: string = '';
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private contentLevelService: ContentLevelService,
               private sharedService: SharedService,
               private router: Router,
               public dialog: MatDialog ) {}

  ngOnInit() {
    this.onLoad();
    this.sharedService.elementCreated$.subscribe(() => {
      this.onLoad();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onLoad() {
    this.contentLevelService.getContentLevels().subscribe(
      (levels) => {
        this.levels = levels;
        this.dataSource.data = levels;
        console.log(this.levels);
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
    this.dataSource.data = this.levels.filter(( level ) => {
      return level.name.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      level.description.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.onLoad();
  }

  // logica de los dialog de material
  createSubject() {
    const dialogRef = this.dialog.open(CreateComponent, {
      disableClose: true // Esta opción evita que el diálogo se cierre haciendo clic fuera de él
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editSubject( levelId: ContentLevel ) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { id: levelId },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showSubject( levelId: ContentLevel ) {
    const dialogRef = this.dialog.open(ShowComponent, {
      data: { id: levelId },
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
          this.contentLevelService.deleteContentLevel( id ).subscribe(
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
  checkboxLabel(row?: ContentLevel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
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
