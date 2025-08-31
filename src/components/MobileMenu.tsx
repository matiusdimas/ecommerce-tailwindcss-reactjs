// components/MobileMenu.tsx
import { Link } from "react-router-dom"
import { useAuth } from "../store/useAuth"

interface MobileMenuProps {
    onClose: () => void
}

function MobileMenu({ onClose }: MobileMenuProps) {
    const { user, isAuthenticated, logout } = useAuth()

    const handleLogout = () => {
        logout()
        onClose() // Tutup menu setelah logout
    }

    return (
        <div className="md:hidden bg-white border-t border-gray-200 fixed inset-0 top-16 z-40 overflow-y-auto">
            <div className="px-4 py-6 space-y-6 h-full pb-20">
                {/* Main Navigation */}
                <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Navigasi
                    </h3>
                    <nav className="space-y-2">
                        <Link
                            to="/"
                            className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                            onClick={onClose}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                            onClick={onClose}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            Semua Produk
                        </Link>
                        <Link
                            to="/about"
                            className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                            onClick={onClose}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Tentang Kami
                        </Link>
                    </nav>
                </div>

                {/* User Section */}
                {isAuthenticated && user && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Akun Saya
                        </h3>
                        <nav className="space-y-2">
                            <Link
                                to="/profile"
                                className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                                onClick={onClose}
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profil Saya
                            </Link>
                            <Link
                                to="/profile#orders"
                                className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                                onClick={onClose}
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Pesanan Saya
                            </Link>
                            <Link
                                to="/profile#address"
                                className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                                onClick={onClose}
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Alamat Saya
                            </Link>
                        </nav>
                    </div>
                )}

                {/* Support Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Bantuan
                    </h3>
                    <nav className="space-y-2">
                        <Link
                            to="/contact"
                            className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                            onClick={onClose}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Hubungi Kami
                        </Link>
                        <Link
                            to="/faq"
                            className="flex items-center py-3 px-4 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                            onClick={onClose}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            FAQ
                        </Link>
                    </nav>
                </div>

                {/* Auth Section */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                    {isAuthenticated ? (
                        <div className="space-y-2">
                            <div className="px-4 py-2 text-sm text-gray-500">
                                Login sebagai <span className="font-medium text-gray-700">{user?.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center py-3 px-4 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Link
                                to="/login"
                                className="flex items-center justify-center py-3 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200"
                                onClick={onClose}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Login / Daftar
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MobileMenu