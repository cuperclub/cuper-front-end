import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AdminCustomerService } from 'src/app/services';
import { User } from 'src/app/models';
import { ColumnDefinition } from 'src/app/components/table/table.component';
import {
  DatetimeCellComponent,
  UserCellComponent,
  RolesCellComponent,
  ActionsCellComponent
} from 'src/app/components/table/partials';
import { ChangePasswordDialogComponent } from 'src/app/components/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'cuper-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: User[];
  columnsUser: ColumnDefinition[];
  pagniationOptions: any;
  currentFilter: string = 'clients';

  constructor(
    private customerService: AdminCustomerService,
    private dialog: MatDialog,
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
    this.customerService.getCustomers(1, 5, null).subscribe(resp => {
      this.customers = this.formatData(resp);
    });
    // MatPaginator Inputs
    const length = 12;
    const pageSize = 5;
    const pageSizeOptions: number[] = [5, 10, 25, 100];
    // MatPaginator Output
    const pageEvent = (paginationData) => {
      const currentPage = paginationData.pageIndex + 1;
      const items_per_page = paginationData.pageSize;
      this.customerService.getCustomers(currentPage, items_per_page, null).subscribe(resp => {
        this.customers = this.formatData(resp);
      });
    };
    this.pagniationOptions = {
      length,
      pageSize,
      pageSizeOptions,
      pageEvent
    };
  }

  formatData(users){
    return users.map(user => {
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

  resetPassword = (rowData) => {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '250px',
      data: {
        user: rowData.user,
        passwordForm: {}
      }
    });
  }

  filterBy(role) {
    this.currentFilter = role;
    this.customerService.getCustomers(1, 5, role).subscribe(resp => {
      this.customers = this.formatData(resp);
    });
  }
}
