import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'models/app-state.model';
import { NotificationItem } from 'models/settings.model';
import { SettingsService } from 'settings/settings.service';
import { HandleSubscription } from 'common/handle-subscription';
import * as settingsActions from 'store/settings/settings.actions';
import { PushNotificationsService } from 'common/components/push-notifications/push-notifications.service';
import { pushNotificationTypesEnum } from 'models/enum/push-notification.enum';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss']
})
export class NotificationSettingsComponent extends HandleSubscription implements OnInit {
  notificationsSettings: NotificationItem[];

  constructor(
    private store: Store<AppState>,
    private settingsService: SettingsService,
    private pushNotificationsService: PushNotificationsService
  ) {
    super();
  }

  ngOnInit() {
    const notificationSubscription = this.store.select('state', 'user', 'settings', 'notificationsSettings')
      .subscribe((notificationsSettings: NotificationItem[]) => {
        this.notificationsSettings = notificationsSettings;
      });
    this.subscriptions.push(notificationSubscription);

    this.store.dispatch(new settingsActions.LoadNotificationsSettings(''));
  }

  onNotificationChange(notification, notificationType) {
    notification[notificationType] = !notification[notificationType];

    this.settingsService.updateNotificationsSettings(this.notificationsSettings)
      .subscribe((notificationSettings) => {
        this.store.dispatch(new settingsActions.UpdateNotificationSettings(notificationSettings));
        this.pushNotificationsService.addPushNotification({
          type: pushNotificationTypesEnum.INFO,
          title: 'Info',
          message: 'Notfication settings changed'
        });
      });
  }
}
