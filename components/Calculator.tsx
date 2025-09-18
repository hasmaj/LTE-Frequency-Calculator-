
import React, { useState, useMemo } from 'react';
import { Input } from './common/Input';
import { Select } from './common/Select';
import { Button } from './common/Button';
import { ResultCard, ResultItem } from './common/ResultCard';
import { getBandInfo, earfcnToFreq, freqToEarfcn } from '../services/lteService';

interface CalculatorProps {
    bandOptions: number[];
}

export const Calculator: React.FC<CalculatorProps> = ({ bandOptions }) => {
    const [mode, setMode] = useState<'earfcnToFreq' | 'freqToEarfcn'>('earfcnToFreq');
    const [band, setBand] = useState<string>('1');
    const [earfcn, setEarfcn] = useState<string>('');
    const [freq, setFreq] = useState<string>('');
    const [direction, setDirection] = useState<'DL' | 'UL'>('DL');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string>('');

    const selectedBandInfo = useMemo(() => getBandInfo(Number(band)), [band]);

    const handleCalculate = () => {
        setResult(null);
        setError('');
        const bandNum = Number(band);

        if (isNaN(bandNum) || !selectedBandInfo) {
            setError('Please select a valid band.');
            return;
        }

        try {
            if (mode === 'earfcnToFreq') {
                const earfcnNum = Number(earfcn);
                if (isNaN(earfcnNum)) {
                    setError('Please enter a valid EARFCN.');
                    return;
                }
                const res = earfcnToFreq(bandNum, earfcnNum);
                if ('error' in res) {
                    setError(res.error);
                } else {
                    setResult(res);
                }
            } else {
                const freqNum = Number(freq);
                if (isNaN(freqNum)) {
                    setError('Please enter a valid Frequency.');
                    return;
                }
                const res = freqToEarfcn(bandNum, freqNum, direction);
                if ('error' in res) {
                    setError(res.error);
                } else {
                    setResult(res);
                }
            }
        } catch (e: any) {
            setError(e.message || 'An unexpected error occurred.');
        }
    };

    const handleBandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBand(e.target.value);
        setResult(null);
        setError('');
        setEarfcn('');
        setFreq('');
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-brand-primary dark:text-brand-secondary mb-2">
                EARFCN ⇔ Frequency Calculator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Calculate frequencies from EARFCN or vice versa for a specific LTE band.</p>

            <div className="flex justify-center mb-6 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                <button 
                    onClick={() => setMode('earfcnToFreq')}
                    className={`w-1/2 py-2 rounded-md font-semibold transition ${mode === 'earfcnToFreq' ? 'bg-brand-primary text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                >
                    EARFCN to Frequency
                </button>
                <button 
                    onClick={() => setMode('freqToEarfcn')}
                    className={`w-1/2 py-2 rounded-md font-semibold transition ${mode === 'freqToEarfcn' ? 'bg-brand-primary text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                >
                    Frequency to EARFCN
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Select label="LTE Band" value={band} onChange={handleBandChange}>
                    {bandOptions.map(b => <option key={b} value={b}>{`Band ${b} (${getBandInfo(b)?.name})`}</option>)}
                </Select>
                
                {mode === 'earfcnToFreq' ? (
                    <Input
                        label="EARFCN"
                        type="number"
                        placeholder="e.g., 300"
                        value={earfcn}
                        onChange={(e) => setEarfcn(e.target.value)}
                    />
                ) : (
                    <>
                        <Input
                            label="Frequency (MHz)"
                            type="number"
                            placeholder="e.g., 2140"
                            value={freq}
                            onChange={(e) => setFreq(e.target.value)}
                        />
                        {selectedBandInfo?.mode === 'FDD' && (
                            <Select label="Direction" value={direction} onChange={(e) => setDirection(e.target.value as 'DL' | 'UL')}>
                                <option value="DL">Downlink (DL)</option>
                                <option value="UL">Uplink (UL)</option>
                            </Select>
                        )}
                    </>
                )}
            </div>

            <div className="mt-6">
                <Button onClick={handleCalculate} className="w-full md:w-auto">Calculate</Button>
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-300 rounded-lg">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                </div>
            )}
            {result && (
                <ResultCard title={`Calculation Results for Band ${band}`}>
                    {mode === 'earfcnToFreq' && (
                        <>
                            {result.dlFreq && <ResultItem label="Downlink Frequency" value={`${result.dlFreq.toFixed(1)} MHz`} />}
                            {result.ulFreq && <ResultItem label="Uplink Frequency" value={`${result.ulFreq.toFixed(1)} MHz`} />}
                            <ResultItem label="Mode" value={selectedBandInfo?.mode} />
                        </>
                    )}
                    {mode === 'freqToEarfcn' && (
                        <>
                            <ResultItem label={`${direction} EARFCN`} value={result.earfcn} />
                            <ResultItem label="Mode" value={selectedBandInfo?.mode} />
                        </>
                    )}
                </ResultCard>
            )}
        </div>
    );
};
