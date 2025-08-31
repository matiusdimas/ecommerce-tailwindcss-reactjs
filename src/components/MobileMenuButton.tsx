// components/MobileMenuButton.tsx (dengan tooltip)
import ToolTip from "./ToolTip"

interface MobileMenuButtonProps {
    onClick: () => void
}

function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
    return (
        <button
            onClick={onClick}
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            aria-label="Toggle menu"
        >
            <ToolTip tooltipText="Menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </ToolTip>
        </button>
    )
}

export default MobileMenuButton