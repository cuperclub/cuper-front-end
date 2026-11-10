import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { Promotion } from 'src/app/models';
import { PromotionService } from 'src/app/services';
import { OutputTransactionService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { UtilsService } from 'src/app/services';
import { NgIf } from '@angular/common';
import { SquareSelectComponent } from '../square-select/square-select.component';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'cuper-output-transaction-form',
    templateUrl: './output-transaction-form.component.html',
    styleUrls: ['./output-transaction-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgIf, SquareSelectComponent, MatDialogActions, MatButton, MatDialogClose, TranslateModule]
})
export class OutputTransactionFormComponent implements OnInit {
  rewards: Promotion [];
  selectedReward: Promotion;

  constructor(
    public dialogRef: MatDialogRef<CompanyCardComponent>,
    private promotionService: PromotionService,
    private transactionService: OutputTransactionService,
    private message: MatSnackBar,
    private translate: TranslateService,
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.promotionService.getMyPromotions().subscribe(resp => this.rewards = resp['promotions']);
  }

  onSelectReward = (reward) => this.selectedReward = reward;

  onSubmitReward(): void {
    const outputTransaction = {
      user_id: this.data.user.id,
      promotion_id: this.selectedReward.id,
      points: this.selectedReward.points_required
    };
    this.transactionService.create(outputTransaction)
    .subscribe(
      (resp) => this.onSuccess(resp, 'common.messages.created'),
      (error) =>  this.onError(error)
    );
  }

  onSuccess(resp: object, message: string): void {
    this.translate.get(message).subscribe((message: string) => {
      this.message.open(message, '', {
        duration: 2000
      });
      this.dialogRef.close(resp);
    });
  }

  onError(resp): void {
    const errors = resp.error ? this.utilsService.formatErrorsAsObject(resp.error) : resp.errors;
    this.message.open(errors, '', {
      duration: 2000
    });
  }

}
