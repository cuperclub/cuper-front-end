import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from '../../models';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cuper-card-register-company',
    templateUrl: './card-register-company.component.html',
    styleUrls: ['./card-register-company.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatButton, TranslateModule]
})
export class CardRegisterCompanyComponent {
  @Input() selectedPlan: Plan;

  constructor(
    private router: Router
  ) { }

  registerCompany = () => this.router.navigate(['home/register_company']);

}
