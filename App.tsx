
import React, { useState, useMemo } from 'react';
import { Calculator } from './components/Calculator';
import { BandInfoLookup } from './components/BandInfoLookup';
import { OverlapFinder } from './components/OverlapFinder';
import { UeCategoryFinder } from './components/UeCategoryFinder';
import { Tab } from './constants';
import { allBandsData } from './services/lteData';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>(Tab.CALCULATOR);

    const bandOptions = useMemo(() => allBandsData.map(b => b.band), []);

    const renderActiveTab = () => {
        switch (activeTab) {
            case Tab.CALCULATOR:
                return <Calculator bandOptions={bandOptions} />;
            case Tab.BAND_INFO:
                return <BandInfoLookup bandOptions={bandOptions} />;
            case Tab.OVERLAP_INFO:
                return <OverlapFinder bandOptions={bandOptions} />;
            case Tab.UE_CATEGORY_INFO:
                return <UeCategoryFinder bandOptions={bandOptions} />;
            default:
                return <Calculator bandOptions={bandOptions} />;
        }
    };

    const NavButton = ({ tab, children }: { tab: Tab; children: React.ReactNode }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-sm sm:px-4 sm:text-base font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:ring-brand-secondary ${
                activeTab === tab
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="min-h-screen font-sans">
            <header className="bg-brand-primary shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                        LTE Frequency Calculator
                    </h1>
                    <p className="text-blue-200 text-sm sm:text-base mt-1">
                        Advanced tools for telecommunications professionals
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg flex flex-wrap gap-2 justify-center">
                    <NavButton tab={Tab.CALCULATOR}>EARFCN ⇔ Freq</NavButton>
                    <NavButton tab={Tab.BAND_INFO}>Band Info</NavButton>
                    <NavButton tab={Tab.OVERLAP_INFO}>Band Overlap</NavButton>
                    <NavButton tab={Tab.UE_CATEGORY_INFO}>UE Category</NavButton>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
                    {renderActiveTab()}
                </div>

                <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-400">
                    <p>&copy; {new Date().getFullYear()} LTE Frequency Calculator. All data is for informational purposes.</p>
                </footer>
            </main>
        </div>
    );
};

export default App;
