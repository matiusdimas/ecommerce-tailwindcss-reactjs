// components/ProductsButton.tsx
import { Link } from "react-router-dom"
import ToolTip from "./ToolTip"

function ProductsButton() {
    return (
        <Link
            to="/products"
            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            aria-label="All products"
        >
            <ToolTip tooltipText="Semua Produk">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                </svg>
            </ToolTip>
        </Link>
    )
}

export default ProductsButton