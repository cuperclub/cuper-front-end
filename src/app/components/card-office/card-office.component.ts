import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { OfficeFormComponent } from '../office-form/office-form.component';
import { Office, Company } from '../../models';
import { OfficeService } from 'src/app/services';

@Component({
  selector: 'cuper-card-office',
  templateUrl: './card-office.component.html',
  styleUrls: ['./card-office.component.scss']
})
export class CardOfficeComponent implements OnInit {
  @Input() company: Company;
  @Input() offices: Office[];

  constructor(
    private dialog: MatDialog,
    private officeService: OfficeService
  ) { }

  ngOnInit() {
    this.officeService.getOffices().subscribe(data => {
      this.offices = data['offices'];
    });
  }

  onSelectOffice = office => {
    const dialogRef = this.dialog.open(OfficeFormComponent, {
      data: {
        office: Object.assign({}, office),
        companyId: this.company.id
      }
    });

    dialogRef.beforeClosed().subscribe(currentOffice => {
      if(currentOffice){
        const indexOffice = this.offices.findIndex(office => office.id === currentOffice.id);
        this.offices[indexOffice] = currentOffice;
      }
    });
  }

  onAddOffice = () => {
    const dialogRef = this.dialog.open(OfficeFormComponent,{
      data: {
        companyId: this.company.id
      }
    });

    dialogRef.beforeClosed().subscribe(currentOffice => {
      if(currentOffice){
        this.offices.push(currentOffice);
      }
    });
  }

}
