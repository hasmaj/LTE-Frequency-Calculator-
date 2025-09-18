
import { allBandsData, overlapData, ueCategoryData } from './lteData';

const bandsMap = new Map(allBandsData.map(band => [band.band, band]));
const overlapsMap = new Map(overlapData.map(item => [item.band, item]));
const ueCategoriesMap = new Map(ueCategoryData.map(item => [item.band, item]));

export const getBandInfo = (band: number) => {
    return bandsMap.get(band);
};

export const getOverlapInfo = (band: number) => {
    return overlapsMap.get(band);
};

export const getUeCategoryInfo = (band: number) => {
    return ueCategoriesMap.get(band);
};

type EarfcnToFreqResult = { dlFreq?: number; ulFreq?: number };
type FreqToEarfcnResult = { earfcn: number };
type ErrorResult = { error: string };

export const earfcnToFreq = (band: number, earfcn: number): EarfcnToFreqResult | ErrorResult => {
    const bandInfo = getBandInfo(band);
    if (!bandInfo) {
        return { error: 'Band not found.' };
    }

    const result: EarfcnToFreqResult = {};

    if (bandInfo.mode === 'TDD' || bandInfo.mode === 'SDL') {
        const { downlinkFreq, downlinkEarfcn } = bandInfo;
        if (earfcn >= downlinkEarfcn.low && earfcn <= downlinkEarfcn.high) {
            result.dlFreq = downlinkFreq.low + 0.1 * (earfcn - downlinkEarfcn.low);
            return result;
        }
    } else if (bandInfo.mode === 'FDD' && bandInfo.uplinkFreq && bandInfo.uplinkEarfcn) {
        const { downlinkFreq, downlinkEarfcn, uplinkFreq, uplinkEarfcn } = bandInfo;
        let found = false;
        if (earfcn >= downlinkEarfcn.low && earfcn <= downlinkEarfcn.high) {
            result.dlFreq = downlinkFreq.low + 0.1 * (earfcn - downlinkEarfcn.low);
            found = true;
        }
        if (earfcn >= uplinkEarfcn.low && earfcn <= uplinkEarfcn.high) {
            result.ulFreq = uplinkFreq.low + 0.1 * (earfcn - uplinkEarfcn.low);
            found = true;
        }
        if (found) {
            return result;
        }
    }
    
    return { error: 'EARFCN is out of range for the selected band.' };
};

export const freqToEarfcn = (band: number, freq: number, direction: 'DL' | 'UL'): FreqToEarfcnResult | ErrorResult => {
    const bandInfo = getBandInfo(band);
    if (!bandInfo) {
        return { error: 'Band not found.' };
    }

    if (direction === 'DL' || bandInfo.mode === 'TDD' || bandInfo.mode === 'SDL') {
        const { downlinkFreq, downlinkEarfcn } = bandInfo;
        if (freq >= downlinkFreq.low && freq <= downlinkFreq.high) {
            const earfcn = Math.round(downlinkEarfcn.low + 10 * (freq - downlinkFreq.low));
            return { earfcn };
        }
    } 
    
    if (direction === 'UL' && bandInfo.mode === 'FDD' && bandInfo.uplinkFreq && bandInfo.uplinkEarfcn) {
        const { uplinkFreq, uplinkEarfcn } = bandInfo;
         if (freq >= uplinkFreq.low && freq <= uplinkFreq.high) {
            const earfcn = Math.round(uplinkEarfcn.low + 10 * (freq - uplinkFreq.low));
            return { earfcn };
        }
    }

    return { error: `Frequency is out of range for the selected band and direction (${direction}).` };
};
