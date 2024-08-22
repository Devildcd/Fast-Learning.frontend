import { Component, Inject } from '@angular/core';
import { Profile } from '../../interfaces/profile.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Category } from 'src/app/category/interfaces/category.interface';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  profile!: Profile;
  categories: Category[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.id);
  }

  ngOnInit() {
    this.profileService.getProfile(this.data.id).subscribe((profile) => {
      this.profile = profile;
      this.formEdit.patchValue({
        category_id: profile.category_id,
        name: profile.name,
        description: profile.description,
      });
    });
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  formEdit: FormGroup = this.fb.group({
    category_id: [null, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  onEdit() {
    if (this.formEdit.untouched) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, modifique algún campo',
        showConfirmButton: true,
      });
      return;
    }
    const profile = this.formEdit.value;
    this.profileService
      .putProfile(this.data.id, profile)
      .subscribe((profile) => {
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
        this.router.navigate(['/perfiles/listado']);
      });
  }
}
