import { Component, Input, OnInit } from '@angular/core';
import { Office } from '../../models';
import { OfficeService } from 'src/app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cuper-card-office',
  templateUrl: './card-office.component.html',
  styleUrls: ['./card-office.component.scss']
})
export class CardOfficeComponent implements OnInit {
  offices: Office [];
  myOffices$: Observable<Office[]>;

  constructor(
    private officeService: OfficeService
  ) { }

  ngOnInit() {
    this.myOffices$ = this.officeService.getOffices()
  }

  onSelectOffice = office => {
    console.log('office selected', office);
  }

  onAddOffice = () => {
    console.log('add new office');
  }

}
