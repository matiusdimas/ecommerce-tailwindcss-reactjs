// components/InitialDataLoader.tsx
import { useEffect } from 'react';
import { defaultPreferences } from '../types/user';

// ... (interface definitions tetap sama)

const InitialDataLoader = () => {
    useEffect(() => {
        // Cek apakah data sudah ada di localStorage
        const authData = localStorage.getItem('auth-storage');
        const cartData = localStorage.getItem('cart-storage');

        // Inisialisasi data auth jika belum ada
        if (!authData) {
            const initialAuthData = {
                state: {
                    user: {
                        id_user: "1",
                        name: "Matius Dimas",
                        username: "userdemo",
                        email: "matius@example.com",
                        createdAt: "2025-08-31T07:47:13.415Z",
                        isActive: true,
                        role: "customer",
                        addresses: [
                            {
                                id: 1,
                                type: 'home' as const,
                                label: 'Rumah',
                                recipientName: 'Matius Dimas',
                                phone: '+628123456789',
                                line1: 'Jl. Contoh Alamat No. 123',
                                city: 'Jakarta',
                                state: 'DKI Jakarta',
                                postalCode: '12345',
                                country: 'Indonesia',
                                isDefault: true
                            },
                            {
                                id: 2,
                                type: 'work' as const,
                                label: 'Kantor',
                                recipientName: 'Matius Dimas',
                                phone: '+628987654321',
                                line1: 'Jl. Kantor No. 456, Gedung ABC',
                                line2: 'Lt. 5, Ruang 502',
                                city: 'Jakarta Selatan',
                                state: 'DKI Jakarta',
                                postalCode: '67890',
                                country: 'Indonesia',
                                isDefault: false
                            }
                        ],
                        paymentMethods: [
                            {
                                id: 1,
                                type: 'credit_card' as const,
                                provider: 'Visa',
                                name: 'Matius Dimas',
                                lastFourDigits: '1234',
                                expiryDate: '12/25',
                                isDefault: true
                            },
                            {
                                id: 2,
                                type: 'e_wallet' as const,
                                provider: 'Gopay',
                                name: 'Matius Dimas',
                                lastFourDigits: '5678',
                                isDefault: false
                            }
                        ],
                        preferences: { ...defaultPreferences }
                    },
                    token: "dummy-token-123",
                    isAuthenticated: true,
                    users: []
                },
                version: 0
            };
            localStorage.setItem('auth-storage', JSON.stringify(initialAuthData));
        }

        // Inisialisasi data cart jika belum ada
        if (!cartData) {
            const initialCartData = {
                state: {
                    cartItems: [],
                    cartCount: 0
                },
                version: 0
            };
            localStorage.setItem('cart-storage', JSON.stringify(initialCartData));
        }
    }, []);

    return null;
};

export default InitialDataLoader;