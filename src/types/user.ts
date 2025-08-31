export interface User {
    id_user?: string | number;
    name: string;
    username: string;
    email: string;
    password?: string;
    avatar?: string;
    phone?: string;
    birthDate?: Date | string;
    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | "";
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string;
    isActive?: boolean;
    role?: "admin" | "customer" | "guest";
    addresses?: Address[];
    paymentMethods?: PaymentMethod[];
    preferences?: UserPreferences;
}

export interface Address {
    id: number;
    type: 'home' | 'work' | 'other';
    label?: string;
    recipientName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: number;
    type: 'credit_card' | 'debit_card' | 'e_wallet' | "bank_transfer";
    provider: string;
    name: string;
    lastFourDigits: string;
    expiryDate?: string;
    isDefault: boolean;
}

export interface UserPreferences {
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    newsletter?: boolean;
    theme?: 'light' | 'dark' | 'system';
    language?: string;
}

// Berikan nilai default untuk preferences
export const defaultPreferences: UserPreferences = {
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true,
    theme: 'light',
    language: 'id'
};