import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import useAuth from "../store/useAuth"
import Login from "../pages/Login"
import Home from "../pages/Home"
import type { JSX } from "react"
import Register from "../pages/Register"
import Products from "../pages/Products"
import Profile from "../pages/Profile"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"

// Public route wrapper → cegah akses login/register kalau sudah login
function PublicRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth()
    if (isAuthenticated) {
        return <Navigate to="/home" replace />
    }
    return children
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
