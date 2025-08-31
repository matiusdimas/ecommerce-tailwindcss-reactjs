import { Link } from "react-router-dom"
import { useCart } from "../store/useCart"
import { useMemo } from "react"

export default function CartDropdown() {
    const { cartItems, removeFromCart } = useCart()

    // Gabungkan item dengan id yang sama
    const mergedItems = useMemo(() => {
        const map = new Map<number, { id: number; name: string; price: number; image: string; quantity: number }>()
        cartItems.forEach((item) => {
            if (map.has(item.id)) {
                // Perbaikan: Gunakan qty dari item, bukan tambahkan 1
                map.get(item.id)!.quantity += item.qty
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

    return (
        <div className="absolute right-0 mt-2 w-96 bg-white shadow-xl rounded-xl p-5 z-50 border border-gray-100">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-800">Keranjang Belanja</h3>
                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {mergedItems.length} item
                </span>
            </div>

            {mergedItems.length === 0 ? (
                <div className="py-8 text-center">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-medium">Keranjang belanja kosong</p>
                    <p className="text-sm text-gray-400 mt-1">Tambahkan produk untuk melanjutkan</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                        {mergedItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border border-gray-200" />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-medium text-gray-500">Qty: {item.quantity}</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-sm font-medium text-blue-600">{formatRupiah(item.price)}</span>
                                        </div>
                                        <p className="text-xs font-semibold text-gray-700 mt-1">
                                            Subtotal: {formatRupiah(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    aria-label="Hapus item"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Total:</span>
                            <span className="text-lg font-bold text-gray-800">{formatRupiah(total)}</span>
                        </div>
                        <Link to="/checkout" className="block text-center w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors">
                            Lanjut ke Pembayaran
                        </Link>
                        <Link
                            to="/cart"
                            className="block text-center w-full py-2.5 text-blue-600 hover:text-blue-800 font-medium rounded-lg transition-colors"
                        >
                            Lihat Keranjang Lengkap

                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}