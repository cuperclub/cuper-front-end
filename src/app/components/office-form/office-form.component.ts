import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Office } from '../../models';


@Component({
  selector: 'cuper-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {

  officeForm: FormGroup;

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.generateForm();
  }

  private generateForm(): void {
    this.officeForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]]
    });
  }

  saveOffice(): void {
    console.log('guardando', this.officeForm.value);
  }

  onListerMapPosition(coordinates){
    this.officeForm.value.lat = coordinates.lat;
    this.officeForm.value.long = coordinates.lng;
  }

}
