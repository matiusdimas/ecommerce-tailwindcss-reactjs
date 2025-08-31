import { useState } from "react";
import { useAuth } from "../store/useAuth";
import type { PaymentMethod as PaymentMethodType } from "../types/user";

function PaymentMethods() {
    const { user, addPaymentMethod, updatePaymentMethod, deletePaymentMethod } = useAuth();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        type: 'credit_card' as "credit_card" | "debit_card" | "e_wallet" | "bank_transfer",
        provider: '',
        name: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        isDefault: false
    });

    const paymentMethods = user?.paymentMethods || [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi dasar
        if (!formData.provider || !formData.name || !formData.cardNumber) {
            alert('Harap isi semua field yang wajib diisi');
            return;
        }

        const newPaymentMethod: Omit<PaymentMethodType, 'id'> = {
            type: formData.type,
            provider: formData.provider,
            name: formData.name,
            lastFourDigits: formData.cardNumber.slice(-4),
            expiryDate: formData.expiryDate,
            isDefault: formData.isDefault
        };

        if (editingId !== null) {
            updatePaymentMethod(editingId, newPaymentMethod);
            setEditingId(null);
        } else {
            addPaymentMethod(newPaymentMethod);
            setIsAdding(false);
        }

        // Reset form
        setFormData({
            type: 'credit_card',
            provider: '',
            name: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            isDefault: false
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSetDefault = (id: number) => {
        const paymentMethod = paymentMethods.find(pm => pm.id === id);
        if (paymentMethod) {
            updatePaymentMethod(id, { isDefault: true });
            // Set all others to non-default
            paymentMethods.forEach(pm => {
                if (pm.id !== id && pm.isDefault) {
                    updatePaymentMethod(pm.id, { isDefault: false });
                }
            });
        }
    };

    const handleEdit = (paymentMethod: PaymentMethodType) => {
        setEditingId(paymentMethod.id);
        setFormData({
            type: paymentMethod.type,
            provider: paymentMethod.provider,
            name: paymentMethod.name,
            cardNumber: '', // Jangan isi dengan masked number
            expiryDate: paymentMethod.expiryDate || '',
            cvv: '',
            isDefault: paymentMethod.isDefault
        });
        setIsAdding(true); // Tampilkan form edit
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus metode pembayaran ini?')) {
            deletePaymentMethod(id);
        }
    };

    const cancelForm = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({
            type: 'credit_card',
            provider: '',
            name: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            isDefault: false
        });
    };

    const getPaymentMethodIcon = (provider: string) => {
        const providerIcons: Record<string, string> = {
            'Visa': 'https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png',
            'Mastercard': 'https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png',
            'Gopay': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png',
            'OVO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/1200px-Logo_ovo_purple.svg.png',
            'Dana': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1280px-Logo_dana_blue.svg.png',
            'BCA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png',
            'Mandiri': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1280px-Bank_Mandiri_logo_2016.svg.png',
            'BNI': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BNI_logo.svg/1280px-BNI_logo.svg.png',
            'BRI': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bank_BRI_logo.svg/1280px-Bank_BRI_logo.svg.png'
        };

        return providerIcons[provider] || 'https://via.placeholder.com/40x25';
    };

    const getPaymentMethodTypeText = (type: string) => {
        switch (type) {
            case 'credit_card': return 'Kartu Kredit';
            case 'debit_card': return 'Kartu Debit';
            case 'e_wallet': return 'E-Wallet';
            case 'bank_transfer': return 'Bank Transfer';
            default: return type;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Metode Pembayaran</h2>
                {!isAdding && editingId === null && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Tambah Metode Pembayaran
                    </button>
                )}
            </div>

            {(isAdding || editingId !== null) && (
                <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-4">
                        {editingId !== null ? 'Edit Metode Pembayaran' : 'Tambah Metode Pembayaran Baru'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="credit_card">Kartu Kredit</option>
                                <option value="debit_card">Kartu Debit</option>
                                <option value="e_wallet">E-Wallet</option>
                                <option value="bank_transfer">Bank Transfer</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                            <input
                                type="text"
                                name="provider"
                                value={formData.provider}
                                onChange={handleChange}
                                placeholder="Contoh: Visa, Mastercard, Gopay, dll."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pemilik</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nama yang tertera di kartu"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Kartu</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Kadaluarsa</label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="123"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="isDefault"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
                            Jadikan sebagai metode pembayaran utama
                        </label>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            {editingId !== null ? 'Update' : 'Tambah'}
                        </button>
                        <button
                            type="button"
                            onClick={cancelForm}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {paymentMethods.length === 0 && !isAdding ? (
                    <div className="text-center py-8">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <p className="text-gray-600">Belum ada metode pembayaran yang ditambahkan</p>
                    </div>
                ) : (
                    paymentMethods.map(paymentMethod => (
                        <div key={paymentMethod.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-10 h-6 flex-shrink-0 mr-3">
                                        <img
                                            src={getPaymentMethodIcon(paymentMethod.provider)}
                                            alt={paymentMethod.provider}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {paymentMethod.provider} {getPaymentMethodTypeText(paymentMethod.type)}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {paymentMethod.name} •••• {paymentMethod.lastFourDigits}
                                            {paymentMethod.expiryDate && ` • Berlaku hingga ${paymentMethod.expiryDate}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {paymentMethod.isDefault ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Utama
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleSetDefault(paymentMethod.id)}
                                            className="text-sm text-indigo-600 hover:text-indigo-800"
                                        >
                                            Jadikan Utama
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleEdit(paymentMethod)}
                                        className="text-indigo-600 hover:text-indigo-800 ml-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(paymentMethod.id)}
                                        className="text-red-600 hover:text-red-800 ml-2"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PaymentMethods;