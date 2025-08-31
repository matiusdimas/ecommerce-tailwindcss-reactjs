import { useState, useEffect } from "react"
import { useCheckout } from "../store/useCheckout"
import { useAuth } from "../store/useAuth"
import type { Address } from "../types/user"

interface AddressFormProps {
    onNext: () => void
    onBack?: () => void
}


const convertFormDataToAddress = (formData: any, type: 'home' | 'work' | 'other' = 'home'): Omit<Address, 'id'> => {
    const addressParts = formData.address.split(', ');
    const line1 = addressParts[0] || '';
    const line2 = addressParts.slice(1).join(', ') || '';

    return {
        type,
        label: formData.notes || `Alamat ${type}`,
        recipientName: formData.fullName,
        phone: formData.phone,
        line1,
        line2,
        city: formData.city,
        state: formData.state || '', // State mungkin tidak ada di form
        postalCode: formData.postalCode,
        country: 'Indonesia', // Default country
        isDefault: false
    }
}

export default function AddressForm({ onNext, onBack }: AddressFormProps) {
    const { setShippingAddress } = useCheckout()
    const { user, addAddress } = useAuth()

    const [selectedAddressId, setSelectedAddressId] = useState<number | "new">("new")
    const [formData, setFormData] = useState({
        fullName: user?.name || "",
        phone: user?.phone || "",
        address: "",
        city: "",
        postalCode: "",
        notes: "",
        state: "",
    })
    useEffect(() => {
        if (selectedAddressId !== "new" && user?.addresses) {
            const selectedAddress = user.addresses.find(addr => addr.id === selectedAddressId)
            if (selectedAddress) {
                setFormData({
                    fullName: selectedAddress.recipientName,
                    phone: selectedAddress.phone,
                    address: `${selectedAddress.line1}${selectedAddress.line2 ? ', ' + selectedAddress.line2 : ''}`,
                    city: selectedAddress.city,
                    postalCode: selectedAddress.postalCode,
                    notes: selectedAddress.label || `Alamat ${selectedAddress.type}`,
                    state: selectedAddress.state,
                })
            }
        } else if (selectedAddressId === "new") {
            setFormData({
                fullName: user?.name || "",
                phone: user?.phone || "",
                address: "",
                city: "",
                postalCode: "",
                notes: "",
                state: "",
            })
        }
    }, [selectedAddressId, user])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setShippingAddress({
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            notes: formData.notes,
        })
        if (selectedAddressId === "new") {
            addAddress(convertFormDataToAddress(formData))
        }
        onNext()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Alamat Pengiriman</h2>
            {user?.addresses && user.addresses.length > 0 && (
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pilih Alamat
                    </label>
                    <div className="space-y-2">
                        {user.addresses.map((address) => (
                            <div key={address.id} className="flex items-start">
                                <input
                                    type="radio"
                                    id={`address-${address.id}`}
                                    name="addressSelection"
                                    checked={selectedAddressId === address.id}
                                    onChange={() => setSelectedAddressId(address.id)}
                                    className="mt-1 mr-2"
                                />
                                <label htmlFor={`address-${address.id}`} className="flex-1">
                                    <div className="border rounded-lg p-3 hover:border-blue-500 cursor-pointer">
                                        <p className="font-medium">{address.recipientName}</p>
                                        <p className="text-sm text-gray-600">{address.phone}</p>
                                        <p className="text-sm mt-1">
                                            {address.line1}{address.line2 && `, ${address.line2}`}
                                        </p>
                                        <p className="text-sm">
                                            {address.city}, {address.postalCode}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {address.label || `Alamat ${address.type}`}
                                        </p>
                                    </div>
                                </label>
                            </div>
                        ))}

                        <div className="flex items-start">
                            <input
                                type="radio"
                                id="address-new"
                                name="addressSelection"
                                checked={selectedAddressId === "new"}
                                onChange={() => setSelectedAddressId("new")}
                                className="mt-1 mr-2"
                            />
                            <label htmlFor="address-new" className="flex-1">
                                <div className="border rounded-lg p-3 hover:border-blue-500 cursor-pointer">
                                    <p className="font-medium">Gunakan alamat baru</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Penerima *
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masukkan nama penerima"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Nomor Telepon *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Contoh: 081234567890"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Alamat Lengkap *
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masukkan alamat lengkap termasuk nomor rumah, jalan, dll."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            Kota *
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nama kota"
                        />
                    </div>

                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Kode Pos *
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Contoh: 12345"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            Provinsi
                        </label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nama provinsi"
                        />
                    </div>

                    <div>
                        <label htmlFor="addressType" className="block text-sm font-medium text-gray-700 mb-1">
                            Tipe Alamat
                        </label>
                        <select
                            id="addressType"
                            name="addressType"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="home">Rumah</option>
                            <option value="work">Kantor</option>
                            <option value="other">Lainnya</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Label Alamat (Opsional)
                    </label>
                    <input
                        type="text"
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Contoh: Rumah Utama, Kantor, dll."
                    />
                </div>

                <div className="flex justify-between pt-4">
                    {onBack && (
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Kembali
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Lanjut ke Pengiriman
                    </button>
                </div>
            </form>
        </div>
    )
}