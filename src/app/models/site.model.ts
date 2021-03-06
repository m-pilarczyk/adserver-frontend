import { AssetTargeting } from './targeting-option.model';

interface Site {
  id: number;
  status: number;
  websiteUrl: string;
  primaryLanguage: number;

  estimatedEarnings?: number;
  clicks?: number;
  impressions?: number;
  RPM?: number;
  averageCPC?: number;
  targetingArray?: AssetTargeting;
  targeting?: {
    requires: object;
    excludes: object;
  };
  adUnits?: AdUnit[];
}

interface SitesTotals {
  totalEarnings: number;
  totalClicks: number;
  totalImpressions: number;
  averagePageRPM: number;
  averageCPC: number;
}

interface AdUnit {
  shortHeadline: string;
  type: number;
  size: AdUnitSize;
  status: number;

  code?: string;
  budget?: number;
  clicks?: number;
  impressions?: number;
  CTR?: number;
  averageCPC?: number;
  cost?: number;
}

interface AdUnitSize {
  id: number;
  name: string;
  size: number;
  tags: string[];

  selected?: boolean;
}

export { Site, AdUnit, AdUnitSize, SitesTotals };
