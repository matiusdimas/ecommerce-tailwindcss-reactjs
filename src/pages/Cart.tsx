import { useCart } from "../store/useCart"
import { useMemo } from "react"
import { Link } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()

    // Gabungkan item dengan id yang sama
    const mergedItems = useMemo(() => {
        const map = new Map()
        cartItems.forEach((item) => {
            if (map.has(item.id)) {
                map.get(item.id).quantity += item.qty
            } else {
                map.set(item.id, { ...item, quantity: item.qty })
            }
        })
        return Array.from(map.values())
    }, [cartItems])

    // Hitung total harga
    const total = useMemo(() => {
        return mergedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }, [mergedItems])

    const formatRupiah = (num: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(num)

    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1) {
            // Jika quantity menjadi 0, hapus item
            removeFromCart(id)
        } else {
            updateQuantity(id, newQuantity)
        }
    }

    return (
        <MainLayout title="Keranjang">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Keranjang Belanja</h1>
                    <Link
                        to="/products"
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali Berbelanja
                    </Link>
                </div>

                {mergedItems.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium text-xl mb-2">Keranjang belanja kosong</p>
                        <p className="text-gray-400 mb-6">Tambahkan produk untuk melanjutkan belanja</p>
                        <Link
                            to="/"
                            className="inline-flex items-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Jelajahi Produk
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-2/3">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="border-b border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-gray-800">Item Keranjang</h2>
                                    <button
                                        onClick={clearCart}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Kosongkan Keranjang
                                    </button>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {mergedItems.map((item) => (
                                        <div key={item.id} className="flex items-center p-6">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                                            />
                                            <div className="ml-5 flex-1">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                                                <p className="text-lg font-bold text-blue-600 mb-3">{formatRupiah(item.price)}</p>
                                                <div className="flex items-center">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 py-1 bg-white min-w-[2rem] text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="ml-4 text-red-500 hover:text-red-700 flex items-center"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className="text-lg font-bold text-gray-800">
                                                    {formatRupiah(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/3">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-5">Ringkasan Belanja</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal ({mergedItems.reduce((acc, item) => acc + item.quantity, 0)} item):</span>
                                        <span className="text-gray-800 font-medium">{formatRupiah(total)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Biaya Pengiriman:</span>
                                        <span className="text-green-600 font-medium">Gratis</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-gray-200">
                                        <span className="text-lg font-semibold text-gray-800">Total:</span>
                                        <span className="text-xl font-bold text-blue-600">{formatRupiah(total)}</span>
                                    </div>
                                </div>

                                <Link to={'/checkout'} className="block text-center w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors mb-3">
                                    Lanjut ke Pembayaran
                                </Link>

                                <Link
                                    to="/"
                                    className="block text-center w-full py-2.5 text-blue-600 hover:text-blue-800 font-medium rounded-lg transition-colors"
                                >
                                    Tambah Produk Lainnya
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>

    )
}