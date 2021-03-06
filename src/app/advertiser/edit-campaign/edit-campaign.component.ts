import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

import { fadeAnimation } from 'common/animations/fade.animation';
import { AppState } from 'models/app-state.model';
import * as advertiserAction from 'store/advertiser/advertiser.actions';
import { parseTargetingOptionsToArray } from 'common/components/targeting/targeting.helpers';
import { Campaign } from 'models/campaign.model';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss'],
  animations: [fadeAnimation]
})
export class EditCampaignComponent implements OnInit {
  getRouterOutletState = (outlet) => outlet.isActivated ? outlet.activatedRoute : '';

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.select('state', 'advertiser', 'lastEditedCampaign')
      .take(1)
      .subscribe((lastEditedCampaign: Campaign) => {
        if (!lastEditedCampaign.targetingArray) {
          const targetingOptions = this.route.snapshot.data.targetingOptions;

          this.store.dispatch(
            new advertiserAction.SaveCampaignTargeting(
              parseTargetingOptionsToArray(lastEditedCampaign.targeting, targetingOptions)
            )
          );
        }
      });
  }
}
