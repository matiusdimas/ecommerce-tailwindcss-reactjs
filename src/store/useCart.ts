import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
    id: number
    name: string
    price: number
    image: string
    qty: number
}

interface CartState {
    cartItems: CartItem[]
    cartCount: number
    addToCart: (item: Omit<CartItem, "qty">) => void
    removeFromCart: (id: number) => void
    updateQuantity: (id: number, newQuantity: number) => void
    clearCart: () => void
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            cartItems: [],
            cartCount: 0,
            addToCart: (item) => {
                const existing = get().cartItems.find((i) => i.id === item.id)
                if (existing) {
                    set({
                        cartItems: get().cartItems.map((i) =>
                            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                        ),
                        cartCount: get().cartCount + 1,
                    })
                } else {
                    set({
                        cartItems: [...get().cartItems, { ...item, qty: 1 }],
                        cartCount: get().cartCount + 1,
                    })
                }
            },
            removeFromCart: (id) => {
                const existing = get().cartItems.find((i) => i.id === id)
                if (!existing) return

                set({
                    cartItems: get().cartItems.filter((i) => i.id !== id),
                    cartCount: get().cartCount - existing.qty,
                })
            },
            updateQuantity: (id, newQuantity) => {
                if (newQuantity < 1) return

                const existing = get().cartItems.find((i) => i.id === id)
                if (!existing) return

                const quantityDifference = newQuantity - existing.qty

                set({
                    cartItems: get().cartItems.map((i) =>
                        i.id === id ? { ...i, qty: newQuantity } : i
                    ),
                    cartCount: get().cartCount + quantityDifference,
                })
            },
            clearCart: () => set({ cartItems: [], cartCount: 0 }),
        }),
        { name: "cart-storage" }
    )
)