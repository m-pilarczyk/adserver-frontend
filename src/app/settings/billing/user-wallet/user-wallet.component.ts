import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { HandleSubscription } from 'common/handle-subscription';

import { AddFundsDialogComponent } from 'common/dialog/add-funds-dialog/add-funds-dialog.component';
import { WithdrawFundsDialogComponent } from 'common/dialog/withdraw-funds-dialog/withdraw-funds-dialog.component';
import { ChangeAddressDialogComponent } from 'common/dialog/change-address-dialog/change-address-dialog.component';
import { ChangeAutomaticWithdrawDialogComponent } from 'common/dialog/change-automatic-withdraw-dialog/change-automatic-withdraw-dialog.component';
import { AppState } from 'models/app-state.model';
import { UserFinancialData } from 'models/user.model';
import { appSettings } from 'app-settings';
import { withdrawPeriodsEnum} from 'models/enum/withdraw.enum';

import * as moment from 'moment';

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.scss']
})
export class UserWalletComponent extends HandleSubscription implements OnInit {
  faqLink = appSettings.FAQ_LINK;

  periodsEnum = withdrawPeriodsEnum;
  financialData: UserFinancialData;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    super();
  }

  openAddFundsDialog() {
    this.dialog.open(AddFundsDialogComponent);
  }

  openWithdrawFundsDialog() {
    this.dialog.open(WithdrawFundsDialogComponent);
  }

  openChangeAddressDialog() {
    this.dialog.open(ChangeAddressDialogComponent);
  }

  openChangeAutomaticWithdrawsDialog() {
    this.dialog.open(ChangeAutomaticWithdrawDialogComponent);
  }

  ngOnInit() {
    const userFinancialDataSubscription = this.store.select('state', 'user', 'data', 'financialData')
      .subscribe((financialData: UserFinancialData) => {
        this.financialData = financialData;
        Object.assign(this.financialData, { lastPayment: moment(financialData.lastPayment).format('DD/MM/YYYY, hh:mma') });
      });

    this.subscriptions.push(userFinancialDataSubscription);
  }
}
