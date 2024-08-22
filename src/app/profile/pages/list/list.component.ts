import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Profile } from '../../interfaces/profile.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProfileService } from '../../services/profile.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { ShowComponent } from '../show/show.component';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/category/interfaces/category.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  displayedColumns: string[] = ['select', 'name', 'acciones'];
  dataSource = new MatTableDataSource<Profile>([]);
  selection = new SelectionModel<Profile>(true, []);
  profiles: Profile[] = [];
  categories: Category[] = [];
  categoryId!: number;
  filter = true;
  terminoBusqueda: string = '';
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private profileService: ProfileService, 
               private sharedService: SharedService,
               private categoryService: CategoryService,
               private router: Router,
               public dialog: MatDialog ) {}

  ngOnInit() {
    this.onLoad();
    this.sharedService.elementCreated$.subscribe(() => {
      this.onLoad();
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onLoad() {
    this.profileService.getProfiles().subscribe(
      (profiles) => {
        this.profiles = profiles;
        this.dataSource.data = profiles;
        console.log(this.profiles);
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
  filterProfiles() {
    this.profileService.filterProfiles(this.categoryId).subscribe(data => {
      this.profiles = data;
      this.dataSource.data = data;
      console.log(data)
    });
  }

  clearFilter(event: any) {
    this.filter = event.checked;
    if (!this.filter) {
      this.categoryId = null!;
      this.onLoad();
    }
  }

  // logica para el buscador
  filtrarDatos() {
    this.dataSource.data = this.profiles.filter(( profile ) => {
      return profile.name.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  clearBuscador() {
    this.terminoBusqueda = '';
    this.onLoad();
  }

  // logica de los dialog de material
  createProfile() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '100%',
      disableClose: true // Esta opción evita que el diálogo se cierre haciendo clic fuera de él
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editProfile( categoryId: Profile ) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '100%',
      data: { id: categoryId },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showProfile( categoryId: Profile ) {
    const dialogRef = this.dialog.open(ShowComponent, {
      data: { id: categoryId },
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
          this.profileService.deleteProfile( id ).subscribe(
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
  checkboxLabel(row?: Profile): string {
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
