// components/Header.tsx
import { useState } from "react"
import Logo from "./Logo"
import SearchBar from "./SearchBar"
import AuthMenu from "./AuthMenu"
import CartButton from "./CartButton"
import MobileMenu from "./MobileMenu"

import MobileMenuButton from "./MobileMenuButton"
import MobileCartButton from "./MobileCartButton"
import ProductsButton from "./ProductsButton"

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm sticky top-0 z-99">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Logo />
                    <SearchBar />
                    <div className="hidden md:flex items-center space-x-2">
                        <ProductsButton />
                        <CartButton />
                        <AuthMenu />
                    </div>
                    <div className="md:hidden flex items-center space-x-2">
                        <MobileCartButton />
                        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    </div>
                </div>
                {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
            </div>
        </header>
    )
}

export default Header