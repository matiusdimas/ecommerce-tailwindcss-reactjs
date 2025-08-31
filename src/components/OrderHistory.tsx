// src/components/profile/OrderHistory.tsx
import { useState } from "react";
import { useOrders } from "../store/useOrders";
import { useAuth } from "../store/useAuth";
import type { Order } from "../types/order";

function OrderHistory() {
    const { user } = useAuth();
    const { getUserOrders, cancelOrder } = useOrders();
    const [filterStatus, setFilterStatus] = useState<string>("all");

    // Get orders for current user
    const userOrders = user ? getUserOrders(user.id_user!) : [];

    const filteredOrders = filterStatus === "all"
        ? userOrders
        : userOrders.filter(order => order.status === filterStatus);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-indigo-100 text-indigo-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'Menunggu Pembayaran';
            case 'processing': return 'Sedang Diproses';
            case 'shipped': return 'Dikirim';
            case 'delivered': return 'Terkirim';
            case 'cancelled': return 'Dibatalkan';
            default: return status;
        }
    };

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handleCancelOrder = (orderId: number) => {
        if (window.confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
            cancelOrder(orderId);
        }
    };

    const handleReorder = (order: Order) => {
        // Logic untuk memesan ulang akan diimplementasi nanti
        console.log('Reorder:', order);
        alert('Fitur pesan ulang akan segera hadir!');
    };

    const handleTrackOrder = (order: Order) => {
        // Logic untuk melacak pesanan
        console.log('Track order:', order);
        if (order.trackingNumber) {
            alert(`Nomor pelacakan: ${order.trackingNumber}\nFitur pelacakan akan segera hadir!`);
        } else {
            alert('Nomor pelacakan belum tersedia untuk pesanan ini.');
        }
    };

    if (!user) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Silakan login untuk melihat riwayat pesanan</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Riwayat Pesanan</h2>
                <div className="flex items-center space-x-2">
                    <label htmlFor="filterStatus" className="text-sm font-medium text-gray-700">
                        Filter:
                    </label>
                    <select
                        id="filterStatus"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="block w-full pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="all">Semua Status</option>
                        <option value="pending">Menunggu Pembayaran</option>
                        <option value="processing">Sedang Diproses</option>
                        <option value="shipped">Dikirim</option>
                        <option value="delivered">Terkirim</option>
                        <option value="cancelled">Dibatalkan</option>
                    </select>
                </div>
            </div>

            {userOrders.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-gray-600">Belum ada pesanan</p>
                    <p className="text-sm text-gray-500 mt-2">Pesanan Anda akan muncul di sini</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Tidak ada pesanan dengan status yang dipilih</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredOrders.map(order => (
                        <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="mb-2 sm:mb-0">
                                        <span className="text-sm font-medium text-gray-900">No. Pesanan: {order.orderNumber}</span>
                                        <span className="mx-2 text-gray-500">•</span>
                                        <span className="text-sm text-gray-600">{formatDate(order.date)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
                                        <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-center object-cover" />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                            <p className="mt-1 text-sm text-gray-500">Jumlah: {item.quantity}</p>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">{formatCurrency(item.price)}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Alamat Pengiriman:</span>
                                        <span className="text-right">{order.shippingAddress}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <span>Metode Pembayaran:</span>
                                        <span>{order.paymentMethod}</span>
                                    </div>
                                    {order.trackingNumber && (
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <span>Nomor Pelacakan:</span>
                                            <span className="font-medium">{order.trackingNumber}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-base font-medium text-gray-900 mt-4">
                                        <span>Total</span>
                                        <span>{formatCurrency(order.total)}</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap justify-end gap-2">
                                    {order.status === 'delivered' && (
                                        <button
                                            onClick={() => handleReorder(order)}
                                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                                        >
                                            Beli Lagi
                                        </button>
                                    )}
                                    {order.status === 'shipped' && order.trackingNumber && (
                                        <button
                                            onClick={() => handleTrackOrder(order)}
                                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                                        >
                                            Lacak Paket
                                        </button>
                                    )}
                                    {(order.status === 'pending' || order.status === 'processing') && (
                                        <button
                                            onClick={() => handleCancelOrder(order.id)}
                                            className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-md hover:bg-red-200"
                                        >
                                            Batalkan Pesanan
                                        </button>
                                    )}
                                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistory;