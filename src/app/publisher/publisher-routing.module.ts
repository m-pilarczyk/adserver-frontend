import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublisherComponent } from './publisher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { EditSiteBasicInformationComponent } from './edit-site/edit-site-basic-info/edit-site-basic-information.component';
import { EditSiteAdditionalTargetingComponent } from './edit-site/edit-site-additional-targeting/edit-site-additional-targeting.component';
import { EditSiteCreateAdUnitsComponent } from './edit-site/edit-site-create-ad-units/edit-site-create-ad-units.component';
import { EditSiteSummaryComponent } from './edit-site/edit-site-summary/edit-site-summary.component';

import { PublisherGuard } from './publisher-guard.service';
import { SiteResolver } from './resolvers/site.resolver';
import { TargetingCriteriaResolver } from './resolvers/targeting-criteria.resolver';
import { AdUnitSizesResolver } from './resolvers/ad-unit-sizes.resolver';

const publisherRoutes: Routes = [
  {
    path: 'publisher',
    component: PublisherComponent,
    canActivate: [PublisherGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/advertiser/dashboard' },
      { path: 'dashboard', component: DashboardComponent},
      {
        path: 'site/:id',
        component: SiteDetailsComponent,
        resolve: {
          site: SiteResolver
        }
      },
      {
        path: 'create-site',
        component: EditSiteComponent,
        resolve: { targetingOptions: TargetingCriteriaResolver },
        children: [
          { path: 'basic-information',
            component: EditSiteBasicInformationComponent,
            canDeactivate: [PublisherGuard]
          },
          {
            path: 'additional-targeting',
            component: EditSiteAdditionalTargetingComponent,
            canDeactivate: [PublisherGuard]
          },
          {
            path: 'create-ad-units',
            component: EditSiteCreateAdUnitsComponent,
            canDeactivate: [PublisherGuard],
            resolve: { adUnitSizes: AdUnitSizesResolver }
          },
          {
            path: 'summary',
            component: EditSiteSummaryComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(publisherRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PublisherRoutingModule { }
