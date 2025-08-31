// components/Preferences.tsx
import { useState } from "react";
import type { UserPreferences } from "../types/user";

interface PreferencesProps {
    preferences?: UserPreferences;
    onUpdate?: (preferences: Partial<UserPreferences>) => void;
}

export default function Preferences({ preferences, onUpdate }: PreferencesProps) {
    const [formData, setFormData] = useState<UserPreferences>(preferences || {});

    const handleChange = (field: keyof UserPreferences, value: any) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        if (onUpdate) {
            onUpdate(updated);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Preferensi</h2>

            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Notifikasi</h3>
                    <div className="space-y-3">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.emailNotifications || false}
                                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-gray-700">Email Notifications</span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.smsNotifications || false}
                                onChange={(e) => handleChange('smsNotifications', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-gray-700">SMS Notifications</span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.newsletter || false}
                                onChange={(e) => handleChange('newsletter', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-gray-700">Newsletter</span>
                        </label>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Tampilan</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tema
                            </label>
                            <select
                                value={formData.theme || 'light'}
                                onChange={(e) => handleChange('theme', e.target.value as any)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bahasa
                            </label>
                            <select
                                value={formData.language || 'id'}
                                onChange={(e) => handleChange('language', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="id">Indonesia</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={() => onUpdate && onUpdate(formData)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Simpan Preferensi
                </button>
            </div>
        </div>
    );
}