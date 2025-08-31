// components/AuthMenu.tsx (diperbaiki)
import { Link } from "react-router-dom"
import useAuth from "../store/useAuth"
import ToolTip from "./ToolTip"
import OrderButton from "./OrderButton"

function AuthMenu() {
    const { isAuthenticated, logout } = useAuth()

    if (isAuthenticated) {
        return (
            <>
                <OrderButton />
                <Link to="/profile" className="p-2 text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">
                    <ToolTip tooltipText="Profil">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </ToolTip>
                </Link>

                <Link
                    to={"/home"}
                    onClick={logout}
                    className="p-2 text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                    <ToolTip tooltipText="Logout">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </ToolTip>
                </Link>
            </>
        )
    }

    return (
        <div className="flex items-center space-x-2">
            <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors cursor-pointer">
                Login
            </Link>
            <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors cursor-pointer"
            >
                Daftar
            </Link>
        </div>
    )
}

export default AuthMenu