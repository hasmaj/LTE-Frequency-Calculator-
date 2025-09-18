
import React, { useState } from 'react';
import { Select } from './common/Select';
import { ResultCard, ResultItem } from './common/ResultCard';
import { getUeCategoryInfo, getBandInfo } from '../services/lteService';

interface UeCategoryFinderProps {
    bandOptions: number[];
}

export const UeCategoryFinder: React.FC<UeCategoryFinderProps> = ({ bandOptions }) => {
    const [band, setBand] = useState<string>('1');

    const ueCategoryInfo = getUeCategoryInfo(Number(band));
    const bandInfo = getBandInfo(Number(band));

    return (
        <div>
            <h2 className="text-xl font-bold text-brand-primary dark:text-brand-secondary mb-2">
                UE Category Compatibility
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Determine which low-power UE categories are supported by a given LTE band.</p>
            
            <div className="max-w-xs">
                <Select label="Select LTE Band" value={band} onChange={(e) => setBand(e.target.value)}>
                    {bandOptions.map(b => <option key={b} value={b}>{`Band ${b} (${getBandInfo(b)?.name})`}</option>)}
                </Select>
            </div>

            {bandInfo && (
                <ResultCard title={`UE Category Support for Band ${bandInfo.band} (${bandInfo.name})`}>
                    {ueCategoryInfo ? (
                        <>
                           <ResultItem 
                                label="Supported Categories" 
                                value={ueCategoryInfo.categories.join(', ')} 
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                                Based on the provided data, this band is listed for low-power UE operations.
                            </p>
                        </>
                    ) : (
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            This band is not explicitly listed as supporting low-power UE categories (Cat 0, M1/M2, Cat 1bis, NB1/NB2) in the provided data source.
                        </p>
                    )}
                </ResultCard>
            )}
        </div>
    );
};
