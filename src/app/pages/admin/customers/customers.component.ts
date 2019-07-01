import { Component, OnInit } from '@angular/core';
import { AdminCustomerService } from 'src/app/services';
import { User } from 'src/app/models';
import { ColumnDefinition } from 'src/app/components/table/table.component';
import {
  DatetimeCellComponent,
  UserCellComponent,
  RolesCellComponent,
  ActionsCellComponent
} from 'src/app/components/table/partials';

@Component({
  selector: 'cuper-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: User[];
  columnsUser: ColumnDefinition[];
  currentFilter: string = 'clients';

  constructor(
    private customerService: AdminCustomerService
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
      },
      {
        label: 'actions',
        displayName: 'Acciones',
        component: ActionsCellComponent
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
        },
        actions: [
          {
            label: 'reset_password',
            displayName: 'Resetear contraseña',
            action: this.resetPassword
          }
        ]
      }
    });
  }

  resetPassword = () => {
    console.log('enviando emaill...');
  }

  filterBy(role) {
    this.currentFilter = role;
    this.customerService.getCustomers(role).subscribe(resp => {
      this.formatData(resp);
    });
  }
}
