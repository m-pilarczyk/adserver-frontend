import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Campaign, Ad } from 'models/campaign.model';
import { TargetingOption } from 'models/targeting-option.model';
import { parseTargetingForBackend } from 'common/components/targeting/targeting.helpers';

@Injectable()
export class AdvertiserService {

  constructor(private http: HttpClient) { }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${environment.apiUrl}/campaigns`);
  }

  getCampaign(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${environment.apiUrl}/campaign/${id}`);
  }

  deleteAdImage(adId: number) {
    return this.http.post(`${environment.apiUrl}/delete_ad`, { adId });
  }

  saveCampaign(campaign: Campaign): Observable<Campaign> {
    if (campaign.targetingArray) {
      const targetingObject = parseTargetingForBackend(campaign.targetingArray);

      Object.assign(campaign, {targeting: targetingObject});
    }

    return this.http.post<Campaign>(`${environment.apiUrl}/save_campaign`, { campaign });
  }

  updateCampaignStatus(id: string, status: number) {
    return this.http.post(`${environment.apiUrl}/update_campaign_status`, { id, status });
  }

  getTargetingCriteria(): Observable<TargetingOption[]> {
    return this.http.get<TargetingOption[]>(`${environment.apiUrl}/campaign_targeting`);
  }

  saveAd(ad: Ad): Observable<Ad> {
    return this.http.post<Ad>(`${environment.apiUrl}/save_ad`, { ad });
  }
}
