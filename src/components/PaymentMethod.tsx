import { useCheckout, paymentMethods } from "../store/useCheckout"
import { useCart } from "../store/useCart"
import { useMemo } from "react"

interface PaymentMethodProps {
    onComplete: () => void
    onBack: () => void
}

export default function PaymentMethod({ onComplete, onBack }: PaymentMethodProps) {
    const { paymentMethod, setPaymentMethod, shippingMethod } = useCheckout()
    const { cartItems } = useCart()

    const formatRupiah = (num: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(num)

    // Hitung total
    const total = useMemo(() => {
        const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        return subtotal + (shippingMethod?.price || 0)
    }, [cartItems, shippingMethod])

    const handleSelectMethod = (method: typeof paymentMethods[0]) => {
        setPaymentMethod(method)
    }

    const handleCompleteOrder = () => {
        if (!paymentMethod) {
            alert("Pilih metode pembayaran terlebih dahulu")
            return
        }
        onComplete()
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Metode Pembayaran</h2>

            <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        onClick={() => handleSelectMethod(method)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod?.id === method.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">{method.icon}</span>
                            <div>
                                <h3 className="font-semibold text-gray-800">{method.name}</h3>
                                <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Pembayaran */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Pembayaran:</span>
                    <span className="text-xl font-bold text-blue-600">{formatRupiah(total)}</span>
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Kembali
                </button>
                <button
                    onClick={handleCompleteOrder}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Bayar Sekarang
                </button>
            </div>
        </div>
    )
}