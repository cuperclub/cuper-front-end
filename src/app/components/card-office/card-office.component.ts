import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Office } from '../../models';
import { OfficeService } from 'src/app/services';
import { Observable } from 'rxjs';
import { OfficePreviewComponent } from '../office-preview/office-preview.component';

@Component({
  selector: 'cuper-card-office',
  templateUrl: './card-office.component.html',
  styleUrls: ['./card-office.component.scss']
})
export class CardOfficeComponent implements OnInit {
  myOffices$: Observable<Office[]>;

  constructor(
    private dialog: MatDialog,
    private officeService: OfficeService
  ) { }

  ngOnInit() {
    this.myOffices$ = this.officeService.getOffices()
  }

  onSelectOffice = office => {
    this.dialog.open(OfficePreviewComponent, {
      width: '300px',
      data: {
        office: Object.assign({}, office),
        onEditOffice: this.onAddOffice
      }
    });
  }

  onAddOffice = (office) => {
    console.log('add new office');
  }

}
