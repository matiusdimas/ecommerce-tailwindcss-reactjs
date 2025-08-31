import { useCheckout, shippingMethods } from "../store/useCheckout"
import { useCart } from "../store/useCart"
import { useMemo } from "react"

interface ShippingMethodProps {
  onNext: () => void
  onBack: () => void
}

export default function ShippingMethod({ onNext, onBack }: ShippingMethodProps) {
  const { shippingMethod, setShippingMethod } = useCheckout()
  const { cartItems } = useCart()

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

  const handleSelectMethod = (method: typeof shippingMethods[0]) => {
    setShippingMethod(method)
  }

  const handleContinue = () => {
    if (!shippingMethod) {
      alert("Pilih metode pengiriman terlebih dahulu")
      return
    }
    onNext()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Metode Pengiriman</h2>

      <div className="space-y-4 mb-6">
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handleSelectMethod(method)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${shippingMethod?.id === method.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">{method.name}</h3>
                <p className="text-sm text-gray-600">Estimasi: {method.estimated}</p>
              </div>
              <div className="text-lg font-bold text-blue-600">
                {formatRupiah(method.price)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ringkasan Biaya */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-gray-800">{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Ongkos Kirim:</span>
          <span className="text-gray-800">
            {shippingMethod ? formatRupiah(shippingMethod.price) : "-"}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
          <span>Total:</span>
          <span className="text-blue-600">
            {formatRupiah(subtotal + (shippingMethod?.price || 0))}
          </span>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Kembali
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Lanjut ke Pembayaran
        </button>
      </div>
    </div>
  )
}