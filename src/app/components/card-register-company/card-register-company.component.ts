import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from '../../models';

@Component({
  selector: 'cuper-card-register-company',
  templateUrl: './card-register-company.component.html',
  styleUrls: ['./card-register-company.component.scss']
})
export class CardRegisterCompanyComponent {
  @Input() selectedPlan: Plan;

  constructor(
    private router: Router
  ) { }

  registerCompany = () => this.router.navigate(['home/register_company']);

}
