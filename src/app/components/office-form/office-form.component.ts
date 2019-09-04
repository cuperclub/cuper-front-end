import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardOfficeComponent } from '../../components/card-office/card-office.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Office } from '../../models';
import { OfficeService } from '../../services';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

interface point {
  lat: number;
  long: number;
}

@Component({
  selector: 'cuper-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {
  officeForm: FormGroup;
  officePosition: point;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CardOfficeComponent>,
    private officeService: OfficeService,
    private message: MatSnackBar,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }


  ngOnInit() {
    this.generateForm();
  }

  private generateForm(): void {
    const defaultOffice: Office = {
      name: '',
      phone: '',
      email: '',
      address: ''
    };
    const currentOffice = Object.assign(defaultOffice, this.data.office);
    this.isEditMode = !!this.data.office;
    this.officeForm = this.fb.group({
      name: [currentOffice.name, [Validators.required]],
      phone: [currentOffice.phone, [Validators.required]],
      email: [currentOffice.email, [Validators.required, Validators.email]],
      address: [currentOffice.address, [Validators.required]]
    });
    //init position
    if(currentOffice.lat && currentOffice.long) {
      this.officePosition = {
        lat: currentOffice.lat,
        long: currentOffice.long
      };
    }
  }

  onSubmitOffice() {
    const inputOffice = this.data.office || {};
    let officeToSave: Office = Object.assign(inputOffice, this.officeForm.value);
    officeToSave = Object.assign(officeToSave, this.officePosition);
    officeToSave.company_id = this.data.companyId;
    if(this.isEditMode){
      this.editOffice(officeToSave);
    }else {
      this.saveOffice(officeToSave);
    }
  }

  saveOffice(office) {
    this.officeService.createOffice(office)
    .subscribe(
      (resp) => this.onSuccess(resp, 'common.messages.created'),
      error =>  this.onError(error)
    );
  }

  editOffice(office) {
    this.officeService.updateOffice(office)
    .subscribe(
      (resp) => this.onSuccess(resp, 'common.messages.updated'),
      error =>  this.onError(error)
    );
  }

  onSuccess(resp: object, message: string): void {
    this.translate.get(message).subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.dialogRef.close(resp);
    });
  }

  onError(resp): void {
    for (let key in resp.error) {
      this.officeForm.controls[key].setErrors({'backendError': resp.error[key]});
    }
  }

  onListerMapPosition(coordinates) {
    this.officePosition = {
      lat: coordinates.lat,
      long: coordinates.lng
    };
  }

}
