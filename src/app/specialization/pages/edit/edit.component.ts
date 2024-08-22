import { Component, Inject } from '@angular/core';
import { Specialization } from '../../interfaces/specialization.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializationService } from '../../services/specialization.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Profile } from 'src/app/profile/interfaces/profile.interface';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  specialization!: Specialization;
  profiles: Profile[] = [];
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private specializationService: SpecializationService,
    private profileService: ProfileService,
    private sharedService: SharedService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.specializationService.getSpecialization( this.data.id ).subscribe( ( specialization ) => {
      this.specialization = specialization;
      this.formEdit.patchValue({
        profile_id: specialization.profile_id,
        name: specialization.name,
        description: specialization.description
      });
      console.log(specialization)
    } );
    this.profileService.getProfiles().subscribe
    ( (profiles)=> {
      this.profiles = profiles;
    } );
  }

  formEdit: FormGroup = this.fb.group({
    profile_id: ['', Validators.required],
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
    const specialization = this.formEdit.value;
    this.specializationService.putSpecialization( this.data.id, specialization ).subscribe( ( specialization ) => {
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
