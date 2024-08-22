import { Component, Inject } from '@angular/core';
import { ContentType } from '../../interfaces/content-type.interface';
import { ContentTypesService } from '../../services/content-types.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  type!: ContentType;
  loading = true;

  constructor(
    private contentTypeService: ContentTypesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.contentTypeService.getContentType( this.data.id ).subscribe( ( type ) => {
      this.type = type;
      this.loading = false;
      console.log(type)
    } ) ;
  }
}
