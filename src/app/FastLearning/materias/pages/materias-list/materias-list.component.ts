import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Materia } from '../../interfaces/materia.interface';
import { MateriaService } from '../../services/materia.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materias-list',
  templateUrl: './materias-list.component.html',
  styleUrls: ['./materias-list.component.css']
})
export class MateriasListComponent {

  materias: Materia[] = [];
  displayedColumns: string[] = ['select', 'foto', 'nombre', 'actions', 'contenido'];
  dataSource = new MatTableDataSource<Materia>([]);
  selection = new SelectionModel<Materia>(true, []);
  modalTitle: string = "";
  modalData: string = "";

  loading = true;

  constructor( private materiaService:MateriaService, private router: Router ) {}

  ngOnInit() {
    this.cargarMaterias();
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
  checkboxLabel(row?: Materia): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nombre + 1}`;
  }

  cargarMaterias() {
    this.materiaService.getMaterias().subscribe(
      (materias) => {
        this.materias = materias;
        this.dataSource.data = materias;
        console.log(this.materias);
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
        this.loading = false;
      }
    );
  }

  openModal(id: number) {
    // Buscar la materia en el array de materias por su ID
    const materia = this.dataSource.data.find(m => m.id === id);
    // Configurar las propiedades del modal con los datos de la materia seleccionada
    this.modalTitle = materia!.nombre;
    this.modalData = materia!.descripcion;
 }

  eliminarMateria( id:number ) {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: ' #3f51b5',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.materiaService.deleteMateria(id).subscribe(
            () => {
              // Eliminar sin recargar la página
              this.cargarMaterias();
              console.log('Materia eliminada exitosamente');
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
              this.loading = false;
            }
          );
        }
      });
    }
  }

}
