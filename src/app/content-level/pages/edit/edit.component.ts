import { Component, Inject } from '@angular/core';
import { ContentLevel } from '../../interfaces/content-level.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentLevelService } from '../../services/content-level.service';
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

  level!: ContentLevel;
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private contentLevelService: ContentLevelService,
    private sharedService: SharedService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.contentLevelService.getContentLevel( this.data.id ).subscribe( ( level ) => {
      this.level = level;
      this.formEdit.patchValue({
        name: level.name,
        description: level.description
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
    const level = this.formEdit.value;
    this.contentLevelService.putContentLevel( this.data.id, level ).subscribe( ( level ) => {
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
