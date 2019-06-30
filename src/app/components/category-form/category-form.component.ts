import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CardUserComponent } from '../card-user/card-user.component';
import { MatSnackBar } from '@angular/material';
import { Category } from '../../models';
import { CategoryService } from '../../services';

@Component({
  selector: 'cuper-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: Category = {};

  constructor(
    private message: MatSnackBar,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CardUserComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}


  ngOnInit() {
    this.generateForm();
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  private generateForm(): void {
    const defaultOffice: Category = {
      name: '',
      points_per_dollar: 1
    };
    this.categoryForm = Object.assign(defaultOffice, this.data.category);
  }

  onSubmit(category): void {
    debugger
    if (!!this.data.new){
      this.categoryService.addCategories(category).subscribe(
        res =>    this.onSuccess(res, 'common.messages.created'),
        error =>  this.onError(error)
      );
    }else{
      this.categoryService.updateCategories(category).subscribe(
        res =>    this.onSuccess(res, 'common.messages.updated'),
        error =>  this.onError(error)
      );
    }
  }

  onSuccess(resp, key): void {
    this.translate.get('common.messages.updated').subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.dialogRef.close(resp);
    });
  }

  onError(resp): void {
    let errors = resp.error ? resp.error.errors : {};
  }
}
