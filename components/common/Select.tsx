
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => {
    const selectId = id || `select-${label.replace(/\s+/g, '-')}`;
    return (
        <div>
            <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {label}
            </label>
            <select
                id={selectId}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm
                focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
                {...props}
            >
                {children}
            </select>
        </div>
    );
};
