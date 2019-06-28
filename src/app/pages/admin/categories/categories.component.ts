import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCategoryService } from '../../../services';
import { Category } from '../../../models';

@Component({
  selector: 'cuper-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(
    private categoryService: AdminCategoryService
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCayegories();
  }

  editCategory(){

  }
}
