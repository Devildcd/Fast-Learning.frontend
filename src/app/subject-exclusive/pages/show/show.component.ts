import { Component, Inject } from '@angular/core';
import { SubjectExclusive } from '../../interfaces/subject-exclusive.interface';
import { SubjectExclusiveService } from '../../services/subject-exclusive.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  exclusive!: SubjectExclusive;
  baseUrl = 'http://localhost/fastLearning-backend/public/storage/';
  loading = true;

  constructor(
    private exclusiveService: SubjectExclusiveService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.exclusiveService.getSubjectExclusive( this.data.id ).subscribe( ( exclusive ) => {
      this.exclusive = exclusive;
      this.loading = false;
      console.log(exclusive)
    } ) ;
  }

  // Método para obtener la URL completa del documento
  getDocumentUrl(path: string | undefined): string | undefined {
    if (path) {
      return this.baseUrl + path.replace('public/', '');
    }
    return undefined;
  }

  slideConfig = {
    "slidesToShow": 1, 
    "slidesToScroll": 1,
    "autoplay": false,
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
    "infinite": true,
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "arrow": true,
          "infinite": true,
          "slidesToShow": 2,
          "slidesToScroll": 2
        }
      },

      {
        "breakpoint": 768,
        "settings": {
          "arrow": true,
          "infinite": true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ]};
}
