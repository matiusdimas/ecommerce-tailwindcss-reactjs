export interface OrderItem {
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: number;
    orderNumber: string;
    date: Date | string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: OrderItem[];
    total: number;
    shippingAddress: string;
    paymentMethod: string;
    trackingNumber?: string;
    userId: string | number;
}

export interface OrderState {
    orders: Order[];
    addOrder: (order: Omit<Order, 'id' | 'orderNumber'>) => Order; // Tambahkan return type Order
    updateOrderStatus: (orderId: number, status: Order['status']) => void;
    cancelOrder: (orderId: number) => void;
    getUserOrders: (userId: string | number) => Order[];
    getOrderById: (orderId: number) => Order | undefined;
}