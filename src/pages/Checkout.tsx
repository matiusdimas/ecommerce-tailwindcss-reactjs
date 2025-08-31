// pages/CheckoutPage.tsx
import { useState } from "react"
import { useCheckout } from "../store/useCheckout"
import { useCart } from "../store/useCart"
import { useOrders } from "../store/useOrders"
import { useAuth } from "../store/useAuth"
import AddressForm from "../components/AddressForm"
import ShippingMethod from "../components/ShippingMethod"
import PaymentMethod from "../components/PaymentMethod"
import OrderSummary from "../components/OrderSummary"
import MainLayout from "../layouts/MainLayout"
import type { OrderItem, Order } from "../types/order"
import { Link } from "react-router-dom"

export default function Checkout() {
    const { step, setStep, resetCheckout, shippingAddress, paymentMethod, shippingMethod } = useCheckout()
    const { cartItems, clearCart } = useCart()
    const { addOrder } = useOrders()
    const { user } = useAuth()
    const [orderCompleted, setOrderCompleted] = useState(false)
    const [orderNumber, setOrderNumber] = useState("")

    const handleNextStep = () => {
        setStep(step + 1)
    }

    const handleBackStep = () => {
        setStep(step - 1)
    }

    const handleCompleteOrder = () => {
        if (!user || !shippingAddress || !shippingMethod || !paymentMethod) {
            alert("Data checkout tidak lengkap. Silakan lengkapi terlebih dahulu/login dahulu.")
            return
        }

        // Hitung total amount
        const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.qty), 0) + shippingMethod.price

        // Format shipping address untuk ditampilkan
        const formattedShippingAddress = `${shippingAddress.fullName}, ${shippingAddress.phone}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}${shippingAddress.notes ? `, Catatan: ${shippingAddress.notes}` : ''}`

        // Buat order items dari cart
        const orderItems: OrderItem[] = cartItems.map((item, index) => ({
            id: index + 1,
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.qty,
            image: item.image
        }))

        // Buat order baru (tanpa id dan orderNumber, akan di-generate oleh addOrder)
        const newOrderData: Omit<Order, 'id' | 'orderNumber'> = {
            date: new Date().toISOString(),
            status: 'pending',
            items: orderItems,
            total: totalAmount,
            shippingAddress: formattedShippingAddress,
            paymentMethod: paymentMethod.name,
            userId: user.id_user!
        }

        // Tambahkan order ke store
        const newOrder = addOrder(newOrderData)

        // Simpan nomor order untuk ditampilkan
        setOrderNumber(newOrder.orderNumber)

        // Tandai order sebagai completed
        setOrderCompleted(true)

        // Bersihkan cart dan reset checkout
        clearCart()
        resetCheckout()
    }

    if (cartItems.length === 0 && !orderCompleted) {
        return (
            <MainLayout title="Checkout">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium text-xl mb-2">Keranjang belanja kosong</p>
                        <p className="text-gray-400 mb-6">Tambahkan produk untuk melanjutkan ke checkout</p>
                        <a
                            href="/"
                            className="inline-flex items-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                        >
                            Kembali Berbelanja
                        </a>
                    </div>
                </div>
            </MainLayout>
        )
    }

    if (orderCompleted) {
        return (
            <MainLayout title="Order Success">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="mx-auto w-24 h-24 flex items-center justify-center bg-green-100 rounded-full mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pesanan Berhasil!</h1>
                        <p className="text-gray-600 mb-2">Nomor Pesanan: {orderNumber}</p>
                        <p className="text-gray-600 mb-6">Terima kasih telah berbelanja. Pesanan Anda sedang diproses.</p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="/products"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Berbelanja Lagi
                            </a>
                            <Link
                                to="/profile#orders"
                                className="block text-center px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Lihat Pesanan
                            </Link>
                        </div>
                    </div>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout title="Checkout">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className={`px-3 py-1 rounded-full ${step >= 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}>
                            Alamat
                        </span>
                        <span>➔</span>
                        <span className={`px-3 py-1 rounded-full ${step >= 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}>
                            Pengiriman
                        </span>
                        <span>➔</span>
                        <span className={`px-3 py-1 rounded-full ${step >= 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}>
                            Pembayaran
                        </span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        {step === 1 && <AddressForm onNext={handleNextStep} />}
                        {step === 2 && <ShippingMethod onNext={handleNextStep} onBack={handleBackStep} />}
                        {step === 3 && <PaymentMethod onComplete={handleCompleteOrder} onBack={handleBackStep} />}
                    </div>

                    <div className="lg:w-1/3">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}