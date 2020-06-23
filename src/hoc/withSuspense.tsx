import React from 'react';

export const withSuspense = (Component: React.ComponentType): React.FC => {
    return (props) => {
        return (
            <React.Suspense fallback={<div>loading...</div>}>
                <Component {...props} />
            </React.Suspense>
        );
    };
};
