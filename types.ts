
export interface BandwidthInfo {
    '1.4'?: boolean;
    '3'?: boolean;
    '5'?: boolean;
    '10'?: boolean;
    '15'?: boolean;
    '20'?: boolean;
}

export interface FrequencyEarfcnInfo {
    low: number;
    center: number;
    high: number;
}

export interface BandInfo {
    band: number;
    name: string;
    mode: 'FDD' | 'TDD' | 'SDL';
    downlinkFreq: FrequencyEarfcnInfo;
    downlinkEarfcn: FrequencyEarfcnInfo;
    uplinkFreq?: FrequencyEarfcnInfo;
    uplinkEarfcn?: FrequencyEarfcnInfo;
    duplexSpacing?: number | string;
    geographicalArea?: string;
    release: string;
    bandwidths: BandwidthInfo;
    note?: string;
}

export interface OverlapInfo {
    band: number;
    name: string;
    mode: 'FDD' | 'TDD' | 'SDL';
    full: number[];
    partial: number[];
}

export interface UeCategoryInfo {
    band: number;
    name: string;
    mode: 'FDD' | 'TDD' | 'SDL';
    categories: string[];
}
