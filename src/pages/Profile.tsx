// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProfileInfo from "../components/ProfileInfo";
import AddressManager from "../components/AddressManager";
import OrderHistory from "../components/OrderHistory";
import PaymentMethods from "../components/PaymentMethods";
import Preferences from "../components/Preferences";
import { useAuth } from "../store/useAuth";
import type { Address, User, UserPreferences } from "../types/user";
import { useLocation } from "react-router-dom";

function Profile() {
    const [activeTab, setActiveTab] = useState("profile");
    const { user, updateProfile, addAddress, updateAddress, deleteAddress, updatePreferences } = useAuth();
    const location = useLocation();
    const tabs = [
        { id: "profile", name: "Profil", icon: "👤" },
        { id: "address", name: "Alamat", icon: "🏠" },
        { id: "orders", name: "Pesanan", icon: "📦" },
        { id: "payments", name: "Pembayaran", icon: "💳" },
        { id: "preferences", name: "Preferensi", icon: "⚙️" },
    ];

    useEffect(() => {
        if (location.hash) {
            const tabId = location.hash.substring(1); // Remove the # character
            if (tabs.some(tab => tab.id === tabId)) {
                setActiveTab(tabId);
            }
        }
    }, [location.hash]);


    const handleUpdateProfile = (updatedData: Partial<User>) => {
        updateProfile(updatedData);
    };

    const handleAddAddress = (newAddress: Omit<Address, 'id'>) => {
        addAddress(newAddress);
    };

    const handleUpdateAddress = (id: number, updatedAddress: Partial<Address>) => {
        updateAddress(id, updatedAddress);
    };

    const handleDeleteAddress = (id: number) => {
        deleteAddress(id);
    };

    const handleUpdatePreferences = (preferences: Partial<UserPreferences>) => {
        updatePreferences(preferences);
    };

    const renderTabContent = () => {
        if (!user) {
            return (
                <div className="text-center py-8">
                    <p className="text-gray-600">Silakan login untuk melihat profil</p>
                </div>
            );
        }

        switch (activeTab) {
            case "profile":
                return <ProfileInfo user={user} onUpdate={handleUpdateProfile} />;
            case "address":
                return (
                    <AddressManager
                        addresses={user.addresses || []}
                        onAdd={handleAddAddress}
                        onUpdate={handleUpdateAddress}
                        onDelete={handleDeleteAddress}
                    />
                );
            case "orders":
                return <OrderHistory />;
            case "payments":
                return <PaymentMethods />;
            case "preferences":
                return (
                    <Preferences
                        preferences={user.preferences}
                        onUpdate={handleUpdatePreferences}
                    />
                );
            default:
                return <ProfileInfo user={user} onUpdate={handleUpdateProfile} />;
        }
    };

    return (
        <MainLayout title="Profil">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Akun Saya</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Tab Navigation */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow p-4">
                            <div className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                            ? "bg-indigo-50 text-indigo-700 font-medium"
                                            : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        <span className="mr-3 text-lg">{tab.icon}</span>
                                        <span>{tab.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 bg-white rounded-lg shadow p-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Profile;