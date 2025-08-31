// components/OrderButton.tsx
import { Link } from "react-router-dom"
import ToolTip from "./ToolTip"

function OrderButton() {
    return (
        <Link
            to="/profile#orders"
            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            aria-label="My orders"
        >
            <ToolTip tooltipText="Pesanan Saya">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                </svg>
            </ToolTip>
        </Link>
    )
}

export default OrderButton