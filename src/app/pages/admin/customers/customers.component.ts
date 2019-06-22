import { Component, OnInit } from '@angular/core';
import { AdminCustomerService, UserService } from '../../../services';
import { User } from '../../../models';

@Component({
  selector: 'cuper-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: User[];

  constructor(
    private customerService: AdminCustomerService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(resp => {
      console.log(resp);
      this.customers = resp.map(user => {
        return {
          id: user.id,
          title: user.name,
          description: `Email: ${user.email}`,
          image: user.image || this.userService.getAvatar(user.join_at),
          number: user.points,
          text: 'pts'
        };
      });
    });
  }
}
