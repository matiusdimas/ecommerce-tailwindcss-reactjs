// components/CartButton.tsx (dengan tooltip)
import { useState, useRef, useEffect } from "react"
import { useCart } from "../store/useCart"
import CartDropdown from "./CartDropdown"
import ToolTip from "./ToolTip"

function CartButton() {
    const { cartCount } = useCart()
    const [open, setOpen] = useState(false)
    const cartRef = useRef<HTMLDivElement>(null)

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        // Handle escape key to close dropdown
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
            document.addEventListener("keydown", handleEscapeKey)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscapeKey)
        }
    }, [open])

    return (
        <div className="relative" ref={cartRef}>
            <button
                onClick={() => setOpen(!open)}
                className="p-2 text-gray-600 hover:text-indigo-600 relative transition-colors cursor-pointer"
                aria-expanded={open}
                aria-label={`Shopping cart with ${cartCount} items`}
            >
                <ToolTip tooltipText="Keranjang Belanja">
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
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </ToolTip>
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                        {cartCount > 99 ? "99+" : cartCount}
                    </span>
                )}
            </button>
            {open && <CartDropdown />}
        </div>
    )
}

export default CartButton