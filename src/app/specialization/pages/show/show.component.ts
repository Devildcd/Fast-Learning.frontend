import { Component, Inject } from '@angular/core';
import { Specialization } from '../../interfaces/specialization.interface';
import { SpecializationService } from '../../services/specialization.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  specialization!: Specialization;
  loading = true;

  constructor(
    private specializationService: SpecializationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.specializationService.getSpecialization( this.data.id ).subscribe( ( specialization ) => {
      this.specialization = specialization;
      this.loading = false;
      console.log(specialization)
    } ) ;
  }
}
