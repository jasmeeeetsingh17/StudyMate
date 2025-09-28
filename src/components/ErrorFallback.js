import React from 'react';

const ErrorFallback = ({ error, resetError }) => (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
                <div className="bg-red-100 rounded-full p-2 mr-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Something went wrong
                </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error?.message || "An unexpected error occurred"}
            </p>

            <div className="flex gap-3">
                <button
                    onClick={resetError}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                    Reload Page
                </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                    <summary className="cursor-pointer font-mono">Error Details</summary>
                    <pre className="mt-2 whitespace-pre-wrap break-all">
                        {error?.stack || error?.toString()}
                    </pre>
                </details>
            )}
        </div>
    </div>
);

export default ErrorFallback;