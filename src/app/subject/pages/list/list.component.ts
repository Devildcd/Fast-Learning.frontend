import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from '../../interfaces/subject.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SubjectService } from '../../services/subject.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { ShowComponent } from '../show/show.component';
import { Category } from 'src/app/category/interfaces/category.interface';
import { Profile } from 'src/app/profile/interfaces/profile.interface';
import { Specialization } from 'src/app/specialization/interfaces/specialization.interface';
import { CategoryService } from 'src/app/category/services/category.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { SpecializationService } from 'src/app/specialization/services/specialization.service';
import { SubjectIdSourceService } from '../../services/subject-id-source.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  displayedColumns: string[] = ['select', 'photo', 'title', 'acciones'];
  dataSource = new MatTableDataSource<Subject>([]);
  selection = new SelectionModel<Subject>(true, []);
  subjects: Subject[] = [];
  categories: Category[] = [];
  profiles: Profile[] = [];
  specializations: Specialization[] = [];
  categoryId!: number;
  profileId!: number;
  specializationId!: number;
  terminoBusqueda: string = '';
  filter = true;
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private subjectService: SubjectService,
               private categoryService: CategoryService,
               private profileService: ProfileService,
               private specializationService: SpecializationService, 
               private subjectIdSourceService: SubjectIdSourceService,
               private sharedService: SharedService,
               private router: Router,
               public dialog: MatDialog ) {}

  ngOnInit() {
    this.onLoad();
    this.sharedService.elementCreated$.subscribe(() => {
      this.onLoad();
    });

    this.sharedService.imageAdded$.subscribe(() => {
      this.onLoad();
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.profileService.getProfiles().subscribe((profiles) => {
      this.profiles = profiles;
    });
    this.specializationService.getSpecializations().subscribe((specializations) => {
      this.specializations = specializations;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onLoad() {
    this.subjectService.getSubjects().subscribe(
      (subjects) => {
        this.subjects = subjects;
        this.dataSource.data = subjects;
        console.log(this.subjects);
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
  filterSubjects() {
    this.subjectService.filterSubjects(this.categoryId, this.profileId, this.specializationId).subscribe(data => {
      this.subjects = data;
      this.dataSource.data = data;
      console.log(data)
    });
  }

  clearFilter(event: any) {
    this.filter = event.checked;
    if (!this.filter) {
      this.categoryId = null!;
      this.profileId = null!;
      this.specializationId = null!;
      this.onLoad();
    }
  }

  // logica para el buscador
  filtrarDatos() {
    this.dataSource.data = this.subjects.filter(( subject ) => {
      return subject.specialization_id.name.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      subject.title.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.onLoad();
  }

  // logica de los dialog de material
  createSubject() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '100%',
      disableClose: true // Esta opción evita que el diálogo se cierre haciendo clic fuera de él
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editSubject( subjectId: Subject ) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '100%',
      data: { id: subjectId },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showSubject( subjectId: Subject ) {
    const dialogRef = this.dialog.open(ShowComponent, {
      data: { id: subjectId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // logica para capturar el Id de la subject y enviarlo al servicio compartido
  contentsSubjectId( subjectId: number ) {
    this.subjectIdSourceService.changeSubjectId( subjectId );
    this.router.navigate(['/contenidos/listado', subjectId]);
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
          this.subjectService.deleteSubject( id ).subscribe(
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
  checkboxLabel(row?: Subject): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.title + 1}`;
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
