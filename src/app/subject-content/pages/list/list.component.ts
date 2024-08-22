import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectContent } from '../../interfaces/subject-content.interface';
import { ContentLevel } from 'src/app/content-level/interfaces/content-level.interface';
import { ContentType } from 'src/app/content-type/interfaces/content-type.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SubjectContentService } from '../../services/subject-content.service';
import { ContentLevelService } from 'src/app/content-level/services/content-level.service';
import { ContentTypesService } from 'src/app/content-type/services/content-types.service';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'src/app/subject/interfaces/subject.interface';
import { SubjectService } from 'src/app/subject/services/subject.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { ShowComponent } from '../show/show.component';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  displayedColumns: string[] = ['select', 'name', 'usage_level', 'acciones'];
  dataSource = new MatTableDataSource<SubjectContent>([]);
  selection = new SelectionModel<SubjectContent>(true, []);
  subject!: Subject;
  contents: SubjectContent[] = [];
  levels: ContentLevel[] = [];
  types: ContentType[] = [];
  levelId!: number;
  typeId!: number;
  terminoBusqueda: string = '';
  filter = true;
  elementId!: number;
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private subjectService: SubjectService,
               private contentService: SubjectContentService,
               private contentLevelService: ContentLevelService,
               private contentTypeService: ContentTypesService,
               private sharedService: SharedService,
               private router: Router,
               private activeRoute: ActivatedRoute,
               private spinnerService: SpinnerService,
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
    this.spinnerService.loadingCompleted$.subscribe(loadingCompleted => {
      if (loadingCompleted) {
        this.loading = false;
      } else {
        this.loading = true; // En caso de error o carga fallida
      }
    });
    this.contentLevelService.getContentLevels().subscribe((levels) => {
      this.levels = levels;
    });
    this.contentTypeService.getContentTypes().subscribe((types) => {
      this.types = types;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onLoad() {
    this.contentService.getSubjectContents( this.subject.id! ).subscribe(
      (contents) => {
        this.contents = contents;
        this.dataSource.data = contents;
        console.log(this.contents);
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

  // Logica para filtrar las materias
  filterContent() {
    this.contentService.filterSubjectContents(this.subject.id, this.levelId, this.typeId).subscribe(data => {
      this.contents = data;
      this.dataSource.data = data;
      console.log(data)
    });
  }

  clearFilter(event: any) {
    this.filter = event.checked;
    if (!this.filter) {
      this.levelId = null!;
      this.typeId = null!;
      this.onLoad();
    }
  }

  // logica para el buscador
  filtrarDatos() {
    this.dataSource.data = this.contents.filter(( content ) => {
      return content.subject_id.title.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      content.name.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      content.usage_level.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.onLoad();
  }

  // logica de los dialog de material
  createContent() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '100%',
      disableClose: true // Esta opción evita que el diálogo se cierre haciendo clic fuera de él
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editContent( elementId: SubjectContent ) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '100%',
      data: { id: elementId },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showContent( elementId: SubjectContent ) {
    const dialogRef = this.dialog.open(ShowComponent, {
      width: '100%',
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
          this.contentService.deleteSubjectContent( id ).subscribe(
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
  checkboxLabel(row?: SubjectContent): string {
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
