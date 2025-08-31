// components/Tooltip.tsx
import type { ReactNode } from "react"

interface TooltipProps {
    children: ReactNode
    tooltipText: string
}

function Tooltip({ children, tooltipText }: TooltipProps) {
    return (
        <div className="relative group">
            {children}
            {/* Tooltip */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 
                          bg-gray-800 text-white text-xs py-1 px-2 rounded 
                          opacity-0 group-hover:opacity-100 transition-opacity 
                          pointer-events-none whitespace-nowrap z-50">
                {tooltipText}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                              w-2 h-2 bg-gray-800 rotate-45"></div>
            </div>
        </div>
    )
}

export default Tooltip