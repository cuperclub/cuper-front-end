import { Component, OnInit } from '@angular/core';
import { AdminCustomerService, UtilsService } from '../../../services';
import { User } from '../../../models';
import { ColumnDefinition } from '../../../components/table/table.component';
import {
  DatetimeCellComponent,
  UserCellComponent,
  RolesCellComponent
} from '../../../components/table/partials';

@Component({
  selector: 'cuper-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: any[];
  columnsUser: ColumnDefinition[];

  constructor(
    private customerService: AdminCustomerService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.columnsUser = [
      {
        label: 'user',
        displayName: 'Cliente',
        component: UserCellComponent
      },
      {
        label: 'created_at',
        displayName: 'Se unio en',
        component: DatetimeCellComponent
      },
      {
        label: 'permisions',
        displayName: 'Roles',
        component: RolesCellComponent
      }
    ];
    this.customerService.getCustomers(null).subscribe(resp => {
      this.formatData(resp);
    });
  }

  formatData(users){
    this.customers = users.map(user => {
      return {
        user: user,
        created_at: user.join_at,
        permisions: {
          is_admin: user['is_admin'],
          is_cashier: user['is_cashier'],
          is_partner: user['is_partner']
        }
      }
    });
  }


  filterBy(role) {
    this.customerService.getCustomers(role).subscribe(resp => {
      this.formatData(resp);
    });
  }
}
