
import React from 'react';

interface ResultCardProps {
    title: string;
    children: React.ReactNode;
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, children }) => (
    <div className="mt-8 border border-slate-200 dark:border-slate-700 rounded-lg p-6 bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-brand-primary dark:text-brand-secondary border-b border-slate-300 dark:border-slate-600 pb-2 mb-4">
            {title}
        </h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

interface ResultItemProps {
    label: string;
    value?: string | number | null;
}

export const ResultItem: React.FC<ResultItemProps> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}:</p>
        <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 sm:text-right">{value ?? 'N/A'}</p>
    </div>
);

interface ResultSectionProps {
    title: string;
    children: React.ReactNode;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ title, children }) => (
     <div className="border border-slate-200 dark:border-slate-700 rounded-md p-4">
        <h4 className="font-bold text-md text-slate-700 dark:text-slate-200 mb-2">{title}</h4>
        <div className="space-y-2">
            {children}
        </div>
    </div>
);
