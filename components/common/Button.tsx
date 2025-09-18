
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            className={`bg-brand-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
