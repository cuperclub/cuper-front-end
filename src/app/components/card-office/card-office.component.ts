import { Component, Input, OnInit } from '@angular/core';
import { Office } from '../../models';

@Component({
  selector: 'cuper-card-office',
  templateUrl: './card-office.component.html',
  styleUrls: ['./card-office.component.scss']
})
export class CardOfficeComponent implements OnInit {
  @Input() offices: Office [];

  constructor() { }

  ngOnInit() {
    this.offices = [
      { name: 'Office 1' },
      { name: 'Office 2' },
      { name: 'Office 3' },
      { name: 'Office 3w' },
      { name: 'Office 3s' },
      { name: 'Office 3' },
      { name: 'Office 3a' },
      { name: 'Office 3s' },
    ];
  }

  onSelectOffice = office => {
    console.log('office selected', office);
  }

  onAddOffice = () => {
    console.log('add new office');
  }

}
