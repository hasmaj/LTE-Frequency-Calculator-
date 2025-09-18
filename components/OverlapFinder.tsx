
import React, { useState } from 'react';
import { Select } from './common/Select';
import { ResultCard, ResultItem } from './common/ResultCard';
import { getOverlapInfo, getBandInfo } from '../services/lteService';

interface OverlapFinderProps {
    bandOptions: number[];
}

export const OverlapFinder: React.FC<OverlapFinderProps> = ({ bandOptions }) => {
    const [band, setBand] = useState<string>('1');

    const overlapInfo = getOverlapInfo(Number(band));

    return (
        <div>
            <h2 className="text-xl font-bold text-brand-primary dark:text-brand-secondary mb-2">
                Band Overlap Identification
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Identify bands with full (MFBI) or partial spectrum overlap.</p>
            
            <div className="max-w-xs">
                 <Select label="Select LTE Band" value={band} onChange={(e) => setBand(e.target.value)}>
                    {bandOptions.map(b => <option key={b} value={b}>{`Band ${b} (${getBandInfo(b)?.name})`}</option>)}
                </Select>
            </div>

            {overlapInfo ? (
                 <ResultCard title={`Overlapping Bands for Band ${overlapInfo.band} (${overlapInfo.name})`}>
                    <ResultItem 
                        label="Full (MFBI) Overlap" 
                        value={overlapInfo.full.length > 0 ? overlapInfo.full.join(', ') : 'None'} 
                    />
                    <ResultItem 
                        label="Partial Overlap" 
                        value={overlapInfo.partial.length > 0 ? overlapInfo.partial.join(', ') : 'None'} 
                    />
                </ResultCard>
            ) : (
                <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <p>No overlap information available for the selected band.</p>
                </div>
            )}
        </div>
    );
};
