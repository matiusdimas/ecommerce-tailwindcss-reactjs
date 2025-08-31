// store/useAuth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address, PaymentMethod, User, UserPreferences } from "../types/user";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    users: User[];
    login: (identifier: string, password: string) => Promise<void>;
    register: (userData: Omit<User, 'id_user' | 'createdAt' | 'isActive' | 'role' | 'addresses' | 'paymentMethods' | 'preferences'>) => Promise<void>;
    logout: () => void;
    updateProfile: (userData: Partial<User>) => void;
    addAddress: (address: Omit<Address, 'id'>) => void;
    updateAddress: (id: number, address: Partial<Address>) => void;
    deleteAddress: (id: number) => void;
    addPaymentMethod: (paymentMethod: Omit<PaymentMethod, 'id'>) => void;
    updatePaymentMethod: (id: number, paymentMethod: Partial<PaymentMethod>) => void;
    deletePaymentMethod: (id: number) => void;
    updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            users: [],
            login: async (identifier, password) => {
                const user = get().users.find(u =>
                    (u.email === identifier || u.username === identifier) &&
                    u.password === password
                );

                if (user) {
                    set({
                        user: { ...user, password: undefined },
                        token: "dummy-token",
                        isAuthenticated: true
                    });
                } else {
                    throw new Error("Username/email atau password salah");
                }
            },

            register: async (userData) => {
                const { users } = get();
                if (users.some(u => u.username === userData.username)) {
                    throw new Error("Username sudah digunakan");
                }

                if (users.some(u => u.email === userData.email)) {
                    throw new Error("Email sudah terdaftar");
                }

                const newUser: User = {
                    ...userData,
                    id_user: Date.now().toString(),
                    createdAt: new Date(),
                    isActive: true,
                    role: "customer",
                    addresses: [],
                    paymentMethods: [],
                    preferences: {
                        emailNotifications: true,
                        smsNotifications: false,
                        newsletter: true,
                        theme: 'light',
                        language: 'id'
                    }
                };

                set(state => ({
                    users: [...state.users, newUser],
                    user: { ...newUser, password: undefined },
                    token: "dummy-token",
                    isAuthenticated: true
                }));
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },

            updateProfile: (userData) => {
                set(state => ({
                    user: state.user ? { ...state.user, ...userData } : null,
                    users: state.users.map(u =>
                        u.id_user === state.user?.id_user ? { ...u, ...userData } : u
                    )
                }));
            },

            addAddress: (address) => {
                const newAddress = { ...address, id: Date.now() };
                set(state => ({
                    user: state.user ? {
                        ...state.user,
                        addresses: [...(state.user.addresses || []), newAddress]
                    } : null,
                    users: state.users.map(u =>
                        u.id_user === state.user?.id_user ? {
                            ...u,
                            addresses: [...(u.addresses || []), newAddress]
                        } : u
                    )
                }));
            },

            updateAddress: (id, address) => {
                set(state => ({
                    user: state.user ? {
                        ...state.user,
                        addresses: state.user.addresses?.map(a =>
                            a.id === id ? { ...a, ...address } : a
                        )
                    } : null,
                    users: state.users.map(u =>
                        u.id_user === state.user?.id_user ? {
                            ...u,
                            addresses: u.addresses?.map(a =>
                                a.id === id ? { ...a, ...address } : a
                            )
                        } : u
                    )
                }));
            },

            deleteAddress: (id) => {
                set(state => ({
                    user: state.user ? {
                        ...state.user,
                        addresses: state.user.addresses?.filter(a => a.id !== id)
                    } : null,
                    users: state.users.map(u =>
                        u.id_user === state.user?.id_user ? {
                            ...u,
                            addresses: u.addresses?.filter(a => a.id !== id)
                        } : u
                    )
                }));
            },

            addPaymentMethod: (paymentMethod) => {
                const newPaymentMethod = { ...paymentMethod, id: Date.now() };
                set(state => ({
                    user: state.user ? {
                        ...state.user,
                        paymentMethods: [...(state.user.paymentMethods || []), newPaymentMethod]
                    } : null,
                    users: state.users.map(u =>
                        u.id_user === state.user?.id_user ? {
                            ...u,
                            paymentMethods: [...(u.paymentMethods || []), newPaymentMethod]
                        } : u
                    )
                }));
            },

            updatePaymentMethod: (id, paymentMethod) => {
                set(state => ({
                    user: state.user ? {
                        ...state.user,
                        paymentMethods: state.user.paymentMethods?.map(p =>
                            p.id === id ? { ...p, ...paymentMethod } : p
                        )
                    } : null,
                    users: state.users.map(u =>
                        u.id_user === state.user?.id_user ? {
                            ...u,
                            paymentMethods: u.paymentMethods?.map(p =>
                                p.id === id ? { ...p, ...paymentMethod } : p
                            )
                        } : u
                    )
                }));
            },

            deletePaymentMethod: (id) => {
                set(state => ({
                    user: state.user ? {
                        ...state.user,
                        paymentMethods: state.user.paymentMethods?.filter(p => p.id !== id)
                    } : null,
                    users: state.users.map(u =>
                        u.id_user === state.user?.id_user ? {
                            ...u,
                            paymentMethods: u.paymentMethods?.filter(p => p.id !== id)
                        } : u
                    )
                }));
            },

            updatePreferences: (preferences) => {
                set(state => ({
                    user: state.user ? {
                        ...state.user,
                        preferences: { ...state.user.preferences, ...preferences }
                    } : null,
                    users: state.users.map(u =>
                        u.id_user === state.user?.id_user ? {
                            ...u,
                            preferences: { ...u.preferences, ...preferences }
                        } : u
                    )
                }));
            }
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                users: state.users
            })
        }
    )
);
export default useAuth