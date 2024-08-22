import { Component, Inject } from '@angular/core';
import { ContentLevel } from '../../interfaces/content-level.interface';
import { ContentLevelService } from '../../services/content-level.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  level!: ContentLevel;
  loading = true;

  constructor(
    private contentLevelService: ContentLevelService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.contentLevelService.getContentLevel( this.data.id ).subscribe( ( level ) => {
      this.level = level;
      this.loading = false;
      console.log(level)
    } ) ;
  }
}
