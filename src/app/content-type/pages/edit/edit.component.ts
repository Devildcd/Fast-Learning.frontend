import { Component, Inject } from '@angular/core';
import { ContentType } from '../../interfaces/content-type.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentTypesService } from '../../services/content-types.service';
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

  type!: ContentType;
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private contentTypeService: ContentTypesService,
    private sharedService: SharedService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.contentTypeService.getContentType( this.data.id ).subscribe( ( type ) => {
      this.type = type;
      this.formEdit.patchValue({
        name: type.name,
        description: type.description
      });
    } ); 
  }

  formEdit: FormGroup = this.fb.group({
    name: ['', Validators.required], 
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
    const type = this.formEdit.value;
    this.contentTypeService.putContentType( this.data.id, type ).subscribe( ( type ) => {
      this.sharedService.notificarElementCreated();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        showConfirmButton: false,
        timer: 1000,
      });
    } )
  }
}
