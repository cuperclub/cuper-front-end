import { Component, OnInit } from '@angular/core';
import { AdminCustomerService, UtilsService } from '../../../services';
import { User } from '../../../models';
import { ColumnDefinition } from '../../../components/table/table.component';
import { DatetimeCellComponent, UserCellComponent } from '../../../components/table/partials';

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
      }
    ];
    this.customerService.getCustomers().subscribe(resp => {
      this.customers = resp.map(user => {
        return {
          user: user
        }
      //   return {
      //     id: user.id,
      //     title: user.name,
      //     description: `Email: ${user.email}`,
      //     image: user.image_url || this.utilsService.getAvatar(user.join_at),
      //     number: user.points,
      //     text: 'pts'
      //   };
      });
    });
  }
}
