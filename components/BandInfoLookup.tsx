
import React, { useState } from 'react';
import { Select } from './common/Select';
import { ResultCard, ResultItem, ResultSection } from './common/ResultCard';
import { getBandInfo } from '../services/lteService';
import type { BandwidthInfo } from '../types';

interface BandInfoLookupProps {
    bandOptions: number[];
}

const formatBandwidths = (bw: BandwidthInfo): string => {
    return Object.entries(bw)
        .filter(([, supported]) => supported)
        .map(([width]) => `${width} MHz`)
        .join(', ');
};

export const BandInfoLookup: React.FC<BandInfoLookupProps> = ({ bandOptions }) => {
    const [band, setBand] = useState<string>('1');

    const bandInfo = getBandInfo(Number(band));

    return (
        <div>
            <h2 className="text-xl font-bold text-brand-primary dark:text-brand-secondary mb-2">
                Band Information Lookup
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Retrieve detailed specifications for any LTE band.</p>

            <div className="max-w-xs">
                <Select label="Select LTE Band" value={band} onChange={(e) => setBand(e.target.value)}>
                    {bandOptions.map(b => <option key={b} value={b}>{`Band ${b} (${getBandInfo(b)?.name})`}</option>)}
                </Select>
            </div>

            {bandInfo && (
                <ResultCard title={`Details for Band ${bandInfo.band} (${bandInfo.name})`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ResultItem label="Mode" value={bandInfo.mode} />
                        <ResultItem label="Geographical Area" value={bandInfo.geographicalArea || 'N/A'} />
                        <ResultItem label="3GPP Release" value={bandInfo.release} />
                        {bandInfo.duplexSpacing && <ResultItem label="Duplex Spacing" value={`${bandInfo.duplexSpacing} MHz`} />}
                    </div>
                    <div className="mt-4">
                        <ResultItem label="Supported Channel Bandwidths" value={formatBandwidths(bandInfo.bandwidths) || 'None'} />
                    </div>
                    {bandInfo.note && <ResultItem label="Note" value={bandInfo.note} />}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-6">
                        <ResultSection title="Downlink">
                            <ResultItem label="Frequency Range" value={`${bandInfo.downlinkFreq.low} - ${bandInfo.downlinkFreq.high} MHz`} />
                            <ResultItem label="EARFCN Range" value={`${bandInfo.downlinkEarfcn.low} - ${bandInfo.downlinkEarfcn.high}`} />
                        </ResultSection>

                        {bandInfo.uplinkFreq && bandInfo.uplinkEarfcn ? (
                            <ResultSection title="Uplink">
                                <ResultItem label="Frequency Range" value={`${bandInfo.uplinkFreq.low} - ${bandInfo.uplinkFreq.high} MHz`} />
                                <ResultItem label="EARFCN Range" value={`${bandInfo.uplinkEarfcn.low} - ${bandInfo.uplinkEarfcn.high}`} />
                            </ResultSection>
                        ) : (
                            <ResultSection title="Uplink">
                               <p className="text-sm text-slate-500 dark:text-slate-400">Downlink only</p>
                            </ResultSection>
                        )}
                    </div>
                </ResultCard>
            )}
        </div>
    );
};
