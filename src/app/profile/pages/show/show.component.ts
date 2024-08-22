import { Component, Inject } from '@angular/core';
import { Profile } from '../../interfaces/profile.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  profile!: Profile;
  loading = true;

  constructor(
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.profileService.getProfile( this.data.id ).subscribe( ( profile ) => {
      this.profile = profile;
      this.loading = false;
      console.log(profile)
    } ) ;
  }
}
