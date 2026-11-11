import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OfficeFormComponent } from '../office-form/office-form.component';
import { Office, Company } from '../../models';
import { OfficeService } from 'src/app/services';
import { MatCard } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { NgIf, NgFor } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-card-office',
    templateUrl: './card-office.component.html',
    styleUrls: ['./card-office.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatIconButton, MatIcon, MatDivider, NgIf, NgFor, LoaderComponent, TranslateModule]
})
export class CardOfficeComponent implements OnInit {
  @Input() company: Company;
  @Input() offices: Office[];

  constructor(
    private dialog: MatDialog,
    private officeService: OfficeService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.officeService.getOffices().subscribe(data => {
      this.offices = data['offices'];
      this.changeDetector.markForCheck();
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
        this.changeDetector.markForCheck();
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
        this.changeDetector.markForCheck();
      }
    });
  }

}
