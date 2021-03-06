import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { HandleSubscription } from 'common/handle-subscription';

import { AppState } from 'models/app-state.model';
import { UserFinancialData } from 'models/user.model';

@Component({
  selector: 'app-settings-navigation',
  templateUrl: './settings-navigation.component.html',
  styleUrls: ['./settings-navigation.component.scss'],
})
export class SettingsNavigationComponent extends HandleSubscription implements OnInit {
  financialData: UserFinancialData;

  settings = [
    {
      title: 'General Settings',
      description: 'Your changes to general settings from the Advertiser point ' +
                    'will affect the changes in your Publisher account',
      link: 'general',
      values: [
        { name: 'Preferences', icon: 'assets/images/preferences.svg'},
        { name: 'Notification settings', icon: 'assets/images/notifications.svg'},
      ]
    },
    {
      title: 'Billing & Payments',
      description: '',
      link: 'billing',
      values: [
        { name: 'Your wallet', icon: 'assets/images/wallet--gray.svg'},
        { name: 'Billing History', icon: 'assets/images/history.svg'}
      ]
    }
  ];

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    const userFinancialDataSubscription = this.store.select('state', 'user', 'data', 'financialData')
      .subscribe((financialData: UserFinancialData) => {
        this.financialData = financialData;
      });

    this.subscriptions.push(userFinancialDataSubscription);
  }
}
