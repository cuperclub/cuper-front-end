import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models';
import { InputTransactionFormComponent } from '../../../components/input-transaction-form/input-transaction-form.component';
import { OutputTransactionFormComponent } from '../../../components/output-transaction-form/output-transaction-form.component';

@Component({
  selector: 'cuper-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredUsers: Observable<User[]>;
  defaultImageProfile: string = '../../../../assets/images/profile-placeholder.png';
  currentUser: User;

  users: User[] = [
    {
      image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3144848/3333/2500/m1/fpnw/wm0/jon-snow-01-.jpg?1503324019&s=361666065e9c69eb2e5c669e40b2a8b4',
      name: 'Jhon snow',
      email: 'jhon@example.com',
      national_id: "12345678",
      points: 30
    },
    {
      image: 'https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2017%2F05%2Fgame-of-thrones-season-5-nights-king-hbo-600x337.jpg&w=736&h=485&c=sc',
      name: 'King of night',
      email: 'night_king@example.com',
      national_id: "12345678",
      points: 30
    },
    {
      image: 'https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2017%2F05%2Fgame-of-thrones-season-5-nights-king-hbo-600x337.jpg&w=736&h=485&c=sc',
      name: 'Aria Stark',
      email: 'aria@example.com',
      national_id: "12345678",
      points: 30
    },
    {
      image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3144848/3333/2500/m1/fpnw/wm0/jon-snow-01-.jpg?1503324019&s=361666065e9c69eb2e5c669e40b2a8b4',
      name: 'John nieve',
      email: 'jhon_nieve@example.com',
      national_id: "12345678",
      points: 30
    }
  ];

  constructor(
    private dialog: MatDialog
  ) {
    this.filteredUsers = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterUsers(state) : this.users.slice())
      );
  }

  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    if(this.currentUser) this.currentUser = undefined;
    return this.users.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {

  }

  onClickOption(option){
    this.currentUser = option;
  }

  onInputTransaction(){
    const dialogRef = this.dialog.open(InputTransactionFormComponent, {
      width: '250px',
      data: {
        user: this.currentUser,
        invoice: {}
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      console.log('resp', resp);
    });
  }

  onOutputTransaction(){
    const dialogRef = this.dialog.open(OutputTransactionFormComponent, {
      width: '400px',
      data: {
        user: this.currentUser,
        rewards : [
          {
            title: 'First Promotion',
            description: '2x1 in hotdogs'
          },
          {
            title: 'Second Promotion',
            description: '2x1 in hotdogs'
          },
          {
            title: 'Third Promotion',
            description: '2x1 in hotdogs'
          }
        ],
        onSelectReward: (reward) => console.log('reward selected', reward),
        onSubmitReward: () => console.log('onSubmitReward')
      }
    });
  }

}
