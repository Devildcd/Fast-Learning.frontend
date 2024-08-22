import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Archive } from '../../interfaces/archive.interface';
import { ArchiveService } from '../../services/archive.service';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { switchMap } from 'rxjs';
import { SubjectService } from 'src/app/subject/services/subject.service';
import { Subject } from 'src/app/subject/interfaces/subject.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {


  displayedColumns: string[] = ['select', 'path', 'acciones'];
  dataSource = new MatTableDataSource<Archive>([]);
  selection = new SelectionModel<Archive>(true, []);
  archives: Archive[] = [];
  subject!: Subject;
  terminoBusqueda: string = '';
  selectedFileDocs!: FileList;
  baseUrl = 'http://localhost/fastLearning-backend/public/storage/';
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private archiveService: ArchiveService, 
               private subjectService: SubjectService,
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
    this.archiveService.getArchives( this.subject.id! ).subscribe(
      (archives) => {
        this.archives = archives;
        this.dataSource.data = archives;
        console.log(this.archives);
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
    this.dataSource.data = this.archives.filter(( archive ) => {
      return archive.path.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.onLoad();
  }

  onFileSelectedDocs(event: any) {
    this.selectedFileDocs = event.target.files;
    console.log(this.selectedFileDocs);
    if (this.selectedFileDocs?.length > 0) {
      this.submitDoc();
    }
  }

  submitDoc() {
    const formData = new FormData();
    formData.append('subject_id', this.subject.id!.toString());
    if (this.selectedFileDocs && this.selectedFileDocs.length > 0) {
      for (let i = 0; i < this.selectedFileDocs.length; i++) {
        formData.append('path[]', this.selectedFileDocs[i]);
      }
    }
    this.archiveService.addDocToSubject(formData).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          title: '¡Éxito!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.onLoad();
      },
    );
  }

  getDocumentUrl(path: string | undefined): string | undefined {
    if (path) {
      return this.baseUrl + path.replace('public/', '');
    }
    return undefined;
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
          this.archiveService.deleteDoc( id ).subscribe(
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
  checkboxLabel(row?: Archive): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id! + 1}`;
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
