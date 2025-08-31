// store/useOrders.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, OrderState } from "../types/order";

// Generate order number
const generateOrderNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}${random}`;
};

export const useOrders = create<OrderState>()(
    persist(
        (set, get) => ({
            orders: [],

            addOrder: (orderData): Order => { // Tambahkan return type Order
                const newOrder: Order = {
                    ...orderData,
                    id: Date.now(),
                    orderNumber: generateOrderNumber(),
                    date: new Date().toISOString(),
                };

                set(state => ({
                    orders: [...state.orders, newOrder]
                }));

                return newOrder; // Pastikan mengembalikan newOrder
            },

            updateOrderStatus: (orderId, status) => {
                set(state => ({
                    orders: state.orders.map(order =>
                        order.id === orderId ? { ...order, status } : order
                    )
                }));
            },

            cancelOrder: (orderId) => {
                set(state => ({
                    orders: state.orders.map(order =>
                        order.id === orderId ? { ...order, status: 'cancelled' } : order
                    )
                }));
            },

            getUserOrders: (userId) => {
                return get().orders.filter(order => order.userId === userId)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            },

            getOrderById: (orderId) => {
                return get().orders.find(order => order.id === orderId);
            }
        }),
        {
            name: "order-storage",
        }
    )
);