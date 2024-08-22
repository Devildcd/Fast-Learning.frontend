import { Component, Inject } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  category!: Category;
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.categoryService.getCategory( this.data.id ).subscribe( ( category ) => {
      this.category = category;
      this.formEdit.patchValue({
        name: category.name,
        description: category.description
      })
    } ) 
  }

  formEdit: FormGroup = this.fb.group({
    name: ['Web', Validators.required], 
    description: ['', Validators.required],
  });

  onEdit() {
    if( this.formEdit.untouched ) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, modifique algún campo',
        showConfirmButton: true
      });
      return;
    }
    const category = this.formEdit.value;
    this.categoryService.putCategory( this.data.id, category ).subscribe( ( category ) => {
      this.sharedService.notificarElementCreated();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        showConfirmButton: false,
        timer: 1000,
      });
      // setTimeout( () => {
      //   this.router.
      // } )
      this.router.navigate( ['/categorias/categorias-listado']);
    } )
  }
}
