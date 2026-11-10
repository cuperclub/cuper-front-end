import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCategoryService } from '../../../services';
import { Category } from '../../../models';
import {CategoryFormComponent} from '../../../components/category-form/category-form.component'
import { MatDialog } from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatButton, NgIf, NgFor, MatCard, MatIconButton, MatIcon, LoaderComponent, TranslateModule]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  currentIndex: -1;
  loaded: boolean = false;

  constructor(
    private categoryService: AdminCategoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.categoryService.getCayegories().subscribe(data => {
      this.categories = data['categories'];
      this.loaded = true;
    });
  }

  editCategory(category, index) {
    this.currentIndex = index
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '300px',
      data: {
        category: Object.assign({}, category)
      }
    });

    dialogRef.beforeClosed().subscribe(category => {
      if(category){
        this.categories[this.currentIndex] = category;
      }
    });
  }

  addCategory(){
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '300px',
      data: {
        category: {},
        new: true
      }
    });

    dialogRef.beforeClosed().subscribe(category => {
      if(category){
        this.categories.push(category);
      }
    });
  }
}
