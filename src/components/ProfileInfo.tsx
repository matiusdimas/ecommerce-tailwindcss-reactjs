// src/components/profile/ProfileInfo.tsx
import { useState, useEffect } from "react";
import type { User } from "../types/user";
import { z } from "zod";
import { type ProfileFormData, profileSchema } from "../utils/ProfileValidtaion";



interface ProfileInfoProps {
    user: User;
    onUpdate: (data: Partial<User>) => void;
}

function ProfileInfo({ user, onUpdate }: ProfileInfoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : "",
        gender: user.gender || ""
    });
    const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});

    // Update form data when user changes
    useEffect(() => {
        if (!isEditing) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || "",
                birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : "",
                gender: user.gender || ""
            });
            setErrors({});
        }
    }, [user, isEditing]);

    const validateForm = (): boolean => {
        try {
            profileSchema.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
                error.issues.forEach((issue) => {
                    const path = issue.path[0] as keyof ProfileFormData;
                    newErrors[path] = issue.message;
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onUpdate(formData);
            setIsEditing(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof ProfileFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : "",
            gender: user.gender || ""
        });
        setErrors({});
        setIsEditing(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Informasi Profil</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Edit Profil
                    </button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="male">Laki-laki</option>
                                <option value="female">Perempuan</option>
                                <option value="other">Lainnya</option>
                                <option value="prefer_not_to_say">Lebih baik tidak mengatakan</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Simpan Perubahan
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-2xl text-gray-500">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Nama Lengkap</h4>
                            <p className="text-gray-900">{user.name}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Email</h4>
                            <p className="text-gray-900">{user.email}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Telepon</h4>
                            <p className="text-gray-900">{user.phone || "-"}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Tanggal Lahir</h4>
                            <p className="text-gray-900">
                                {user.birthDate ? new Date(user.birthDate).toLocaleDateString('id-ID') : "-"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Jenis Kelamin</h4>
                            <p className="text-gray-900">
                                {user.gender === 'male' ? 'Laki-laki' :
                                    user.gender === 'female' ? 'Perempuan' :
                                        user.gender === 'other' ? 'Lainnya' :
                                            user.gender === 'prefer_not_to_say' ? 'Tidak disebutkan' : '-'}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Bergabung Sejak</h4>
                            <p className="text-gray-900">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : "-"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileInfo;