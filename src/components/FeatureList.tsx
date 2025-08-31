// components/FeatureList.tsx (flexbox centered version)
import React from 'react';

// Define the Feature component
interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
    return (
        <div className="flex flex-col items-center text-center p-4">
            <div className="mb-4 text-blue-500 text-3xl">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

interface FeatureItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface FeatureListProps {
    features: FeatureItem[];
    title?: string;
    description?: string;
    columns?: 1 | 2 | 3 | 4;
    variant?: 'default' | 'centered' | 'card';
}

function FeatureList({
    features,
    title,
    description,
    columns = 3,
    variant = 'centered'
}: FeatureListProps) {
    const containerClasses = {
        default: 'bg-white',
        centered: 'bg-gray-50',
        card: 'bg-transparent'
    };

    const featureClasses = {
        default: 'flex flex-col items-center text-center',
        centered: 'flex flex-col items-center text-center',
        card: 'bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center'
    };

    // Menghitung lebar berdasarkan jumlah kolom
    const getWidthClass = () => {
        switch (columns) {
            case 1: return 'max-w-md';
            case 2: return 'max-w-sm';
            case 3: return 'max-w-xs';
            case 4: return 'max-w-xs';
            default: return 'max-w-xs';
        }
    };

    return (
        <section className={`py-16 ${containerClasses[variant]}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {(title || description) && (
                    <div className="text-center mb-12 max-w-3xl mx-auto">
                        {title && <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>}
                        {description && <p className="text-lg text-gray-600">{description}</p>}
                        <div className="w-20 h-1 bg-blue-500 mx-auto mt-6"></div>
                    </div>
                )}

                {/* Container flex utama dengan wrapping dan justify-center */}
                <div className="flex flex-wrap justify-center gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${featureClasses[variant]} ${getWidthClass()} flex-none`}
                        >
                            <Feature
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeatureList;