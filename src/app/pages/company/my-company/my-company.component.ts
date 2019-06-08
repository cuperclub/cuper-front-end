import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models';

@Component({
  selector: 'cuper-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {
  myCompany: Company;
  constructor() { }

  ngOnInit() {
  }

  onListerCompanyData(company){
    this.myCompany = company;
  }
}
