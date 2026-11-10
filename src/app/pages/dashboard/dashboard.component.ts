import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../models';
import { UserService } from '../../services';
import { CardUserComponent } from '../../components/card-user/card-user.component';
import { NgIf } from '@angular/common';
import { CompanyCardComponent } from '../../components/company-card/company-card.component';
import { CardPointsComponent } from '../../components/card-points/card-points.component';
import { CardRegisterCompanyComponent } from '../../components/card-register-company/card-register-company.component';

@Component({
    selector: 'cuper-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CardUserComponent, NgIf, CompanyCardComponent, CardPointsComponent, CardRegisterCompanyComponent]
})
export class DashboardComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUserData();
  }

}
