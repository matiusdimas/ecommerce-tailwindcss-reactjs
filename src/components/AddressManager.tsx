// src/components/profile/AddressManager.tsx
import { useState, useEffect } from "react";
import type { Address } from "../types/user";
import { type AddressFormData, addressSchema } from "../utils/addressSchema";





interface AddressManagerProps {
    addresses: Address[];
    onAdd: (address: Omit<Address, 'id'>) => void;
    onUpdate: (id: number, address: Partial<Address>) => void;
    onDelete: (id: number) => void;
}

function AddressManager({ addresses, onAdd, onUpdate, onDelete }: AddressManagerProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<AddressFormData>({
        type: 'home',
        label: '',
        recipientName: '',
        phone: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Indonesia',
        isDefault: false
    });
    const [errors, setErrors] = useState<Partial<Record<keyof AddressFormData, string>>>({});

    // Reset form when switching between add/edit modes
    useEffect(() => {
        if (!isAdding && editingId === null) {
            setFormData({
                type: 'home',
                label: '',
                recipientName: '',
                phone: '',
                line1: '',
                line2: '',
                city: '',
                state: '',
                postalCode: '',
                country: 'Indonesia',
                isDefault: false
            });
            setErrors({});
        }
    }, [isAdding, editingId]);

    const validateForm = (): boolean => {
        const result = addressSchema.safeParse(formData);

        if (result.success) {
            setErrors({});
            return true;
        } else {
            const newErrors: Partial<Record<keyof AddressFormData, string>> = {};
            result.error.issues.forEach((issue) => {
                if (issue.path.length > 0) {
                    const path = issue.path[0] as keyof AddressFormData;
                    newErrors[path] = issue.message;
                }
            });
            setErrors(newErrors);
            return false;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            if (editingId !== null) {
                onUpdate(editingId, formData);
                setEditingId(null);
            } else {
                onAdd(formData);
                setIsAdding(false);
            }
            setFormData({
                type: 'home',
                label: '',
                recipientName: '',
                phone: '',
                line1: '',
                line2: '',
                city: '',
                state: '',
                postalCode: '',
                country: 'Indonesia',
                isDefault: false
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof AddressFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const startEdit = (address: Address) => {
        setEditingId(address.id);
        setFormData({
            type: address.type,
            label: address.label || '',
            recipientName: address.recipientName,
            phone: address.phone,
            line1: address.line1,
            line2: address.line2 || '',
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
            isDefault: address.isDefault
        });
        setErrors({});
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({
            type: 'home',
            label: '',
            recipientName: '',
            phone: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'Indonesia',
            isDefault: false
        });
        setErrors({});
    };

    const cancelAdd = () => {
        setIsAdding(false);
        setFormData({
            type: 'home',
            label: '',
            recipientName: '',
            phone: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'Indonesia',
            isDefault: false
        });
        setErrors({});
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Alamat Saya</h2>
                {!isAdding && editingId === null && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Tambah Alamat Baru
                    </button>
                )}
            </div>

            {(isAdding || editingId !== null) && (
                <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-4">
                        {editingId !== null ? 'Edit Alamat' : 'Tambah Alamat Baru'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Alamat</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="home">Rumah</option>
                                <option value="work">Kantor</option>
                                <option value="other">Lainnya</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Label (opsional)</label>
                            <input
                                type="text"
                                name="label"
                                value={formData.label}
                                onChange={handleChange}
                                placeholder="Contoh: Rumah Utama, Kantor, dll."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penerima *</label>
                            <input
                                type="text"
                                name="recipientName"
                                value={formData.recipientName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.recipientName ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                required
                            />
                            {errors.recipientName && <p className="mt-1 text-sm text-red-600">{errors.recipientName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                required
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label>
                        <textarea
                            name="line1"
                            value={formData.line1}
                            onChange={handleChange}
                            rows={2}
                            className={`w-full px-3 py-2 border ${errors.line1 ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            required
                        ></textarea>
                        {errors.line1 && <p className="mt-1 text-sm text-red-600">{errors.line1}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Detail Alamat (opsional)</label>
                        <input
                            type="text"
                            name="line2"
                            value={formData.line2}
                            onChange={handleChange}
                            placeholder="Contoh: Apartemen, Blok, Nomor, dll."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kota *</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                required
                            />
                            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi *</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                required
                            />
                            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos *</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.postalCode ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                required
                            />
                            {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Negara *</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${errors.country ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            required
                        />
                        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            name="isDefault"
                            id="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
                            Jadikan sebagai alamat utama
                        </label>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            {editingId !== null ? 'Update Alamat' : 'Tambah Alamat'}
                        </button>
                        <button
                            type="button"
                            onClick={editingId !== null ? cancelEdit : cancelAdd}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {addresses.length === 0 && !isAdding ? (
                    <div className="text-center py-8">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-600">Belum ada alamat yang ditambahkan</p>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Tambah Alamat Pertama
                        </button>
                    </div>
                ) : (
                    addresses.map(address => (
                        <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {address.label ||
                                            (address.type === 'home' ? 'Rumah' :
                                                address.type === 'work' ? 'Kantor' : 'Alamat Lainnya')}
                                    </h3>
                                    {address.isDefault && (
                                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2">
                                            Utama
                                        </span>
                                    )}
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => startEdit(address)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(address.id)}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                {address.recipientName} • {address.phone}
                            </p>
                            <p className="text-gray-700 mt-1">
                                {address.line1}
                                {address.line2 && `, ${address.line2}`}
                            </p>
                            <p className="text-gray-700">
                                {address.city}, {address.state} {address.postalCode}
                            </p>
                            <p className="text-gray-700">{address.country}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default AddressManager;