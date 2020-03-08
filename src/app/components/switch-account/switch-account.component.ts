import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'src/app/services';

@Component({
  selector: 'cuper-switch-account',
  templateUrl: './switch-account.component.html',
  styleUrls: ['./switch-account.component.scss']
})
export class SwitchAccountComponent implements OnInit {

  @Input() firstAccount: any = {};
  @Input() secondAccount: any = {};

  firstImage = '';
  secondImage = '';
  nameFirstAccount = '';
  nameSecondtAccount = '';

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.firstImage = this.firstAccount.image || this.firstAccount.logo_url || this.utilsService.getAvatar(this.firstAccount.join_at);
    this.secondImage = this.secondAccount.image || this.secondAccount.logo_url || this.utilsService.getAvatar(this.secondAccount.join_at);
    this.nameFirstAccount = this.firstAccount.name ;
    this.nameSecondtAccount = this.secondAccount.name;
  }

}
