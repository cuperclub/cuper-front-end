import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cuper-card-register-company',
  templateUrl: './card-register-company.component.html',
  styleUrls: ['./card-register-company.component.scss']
})
export class CardRegisterCompanyComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerCompany = () => this.router.navigate(['home/company/register']);

}
