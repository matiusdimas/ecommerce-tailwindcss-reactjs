import type { ReactNode } from 'react'

interface FeatureProps {
    icon: ReactNode
    title: string
    description: string
}

function Feature({ icon, title, description }: FeatureProps) {
    return (
        <>
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </>
    )
}

export default Feature