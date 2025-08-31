import { create } from "zustand"

export interface ShippingAddress {
    id?: number;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
}

export interface PaymentMethod {
    id: string
    name: string
    description: string
    icon: string
}

export interface ShippingMethod {
    id: string
    name: string
    price: number
    estimated: string
}

interface CheckoutState {
    step: number
    shippingAddress: ShippingAddress | null
    paymentMethod: PaymentMethod | null
    shippingMethod: ShippingMethod | null
    setStep: (step: number) => void
    setShippingAddress: (address: ShippingAddress) => void
    setPaymentMethod: (method: PaymentMethod) => void
    setShippingMethod: (method: ShippingMethod) => void
    resetCheckout: () => void
}

export const useCheckout = create<CheckoutState>((set) => ({
    step: 1,
    shippingAddress: null,
    paymentMethod: null,
    shippingMethod: null,
    setStep: (step) => set({ step }),
    setShippingAddress: (shippingAddress) => set({ shippingAddress }),
    setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
    setShippingMethod: (shippingMethod) => set({ shippingMethod }),
    resetCheckout: () => set({
        step: 1,
        shippingAddress: null,
        paymentMethod: null,
        shippingMethod: null
    }),
}))

export const paymentMethods: PaymentMethod[] = [
    {
        id: "bank-transfer",
        name: "Transfer Bank",
        description: "Transfer melalui bank BCA, BRI, BNI, atau Mandiri",
        icon: "🏦",
    },
    {
        id: "credit-card",
        name: "Kartu Kredit",
        description: "Bayar dengan kartu kredit Visa/Mastercard",
        icon: "💳",
    },
    {
        id: "e-wallet",
        name: "E-Wallet",
        description: "GOPAY, OVO, Dana, atau ShopeePay",
        icon: "📱",
    },
    {
        id: "cod",
        name: "Bayar di Tempat",
        description: "Bayar ketika pesanan diterima",
        icon: "💰",
    },
]

export const shippingMethods: ShippingMethod[] = [
    {
        id: "regular",
        name: "Reguler",
        price: 15000,
        estimated: "3-5 hari",
    },
    {
        id: "express",
        name: "Express",
        price: 25000,
        estimated: "1-2 hari",
    },
    {
        id: "same-day",
        name: "Same Day",
        price: 40000,
        estimated: "Hari ini",
    },
]