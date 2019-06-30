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
  categoryForm: any = {}

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
      points_per_dollar: 0
    };

    this.categoryForm = Object.assign(defaultOffice, this.data.category);
    console.log(this.categoryForm);

    // this.isEditMode = !!this.data.office;
    // this.officeForm = this.fb.group({
    //   name: [currentOffice.name, [Validators.required]],
    //   phone: [currentOffice.phone, [Validators.required]],
    //   email: [currentOffice.email, [Validators.required, Validators.email]],
    //   address: [currentOffice.address, [Validators.required]]
    // });
    // //init position
    // if(currentOffice.lat && currentOffice.long) {
    //   this.officePosition = {
    //     lat: currentOffice.lat,
    //     long: currentOffice.long
    //   };
    // }
  }

  onSubmit(category): void {
    this.categoryService.updateCategories(category).subscribe(
      res =>    this.onSuccess(res),
      error =>  this.onError(error)
    );
  }

  onSuccess(resp): void {
    console.log(resp);
    this.translate.get('common.messages.updated').subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.dialogRef.close(resp);
    });
  }

  onError(resp): void {
    console.log(resp);
    let errors = resp.error ? resp.error.errors : {};
  }

}
