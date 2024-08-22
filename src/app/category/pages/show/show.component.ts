import { Component, Inject } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  category!: Category;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data.id) }

  ngOnInit() {
    this.categoryService.getCategory( this.data.id ).subscribe( ( category ) => {
      this.category = category;
      this.loading = false;
      console.log(category)
    } ) ;
  }
}
