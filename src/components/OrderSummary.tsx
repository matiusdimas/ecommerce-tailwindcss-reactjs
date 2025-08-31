import { useCart } from "../store/useCart"
import { useCheckout } from "../store/useCheckout"
import { useMemo } from "react"

export default function OrderSummary() {
    const { cartItems } = useCart()
    const { shippingMethod } = useCheckout()

    const formatRupiah = (num: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(num)

    // Hitung subtotal
    const subtotal = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }, [cartItems])

    const total = subtotal + (shippingMethod?.price || 0)

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Ringkasan Pesanan</h2>

            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                    <div key={`${item.id}-${item.qty}`} className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-800">
                            {formatRupiah(item.price * item.qty)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-800">{formatRupiah(subtotal)}</span>
                </div>

                {shippingMethod && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Ongkos Kirim:</span>
                        <span className="text-gray-800">{formatRupiah(shippingMethod.price)}</span>
                    </div>
                )}

                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                    <span>Total:</span>
                    <span className="text-blue-600">{formatRupiah(total)}</span>
                </div>
            </div>
        </div>
    )
}