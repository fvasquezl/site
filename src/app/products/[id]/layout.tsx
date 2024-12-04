import React from 'react';

interface ProductLayoutProps {
    children: React.ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
    return (
        <div>
            {children}
            <div>
                <h2>Featured products section</h2>
            </div>
        </div>
    );
}