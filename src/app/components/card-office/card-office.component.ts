import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-office',
  templateUrl: './card-office.component.html',
  styleUrls: ['./card-office.component.scss']
})
export class CardOfficeComponent implements OnInit {
  @Input() offices: object [];

  constructor() { }

  ngOnInit() {
    this.offices = [
      { name: 'Office 1' },
      { name: 'Office 2' },
      { name: 'Office 3' },
    ];
  }

  onSelectOffice = office => {
    console.log('office selected', office);
  }

  onAddOffice = () => {
    console.log('add new office');
  }

}
