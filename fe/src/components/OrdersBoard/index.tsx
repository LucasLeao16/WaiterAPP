import { useState } from 'react';
import { toast } from 'react-toastify';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';
interface OrdersBoardProps {
    icon: string;
    title: string;
    orders: Array<Order>;
    onCancelOrder: (orderId: string) => void;
    onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}
export function OrdersBoard({
    icon,
    title,
    orders,
    onCancelOrder,
    onChangeOrderStatus,
}: OrdersBoardProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleOpenModal(order: Order) {
        setIsModalVisible(true);
        setSelectedOrder(order);
    }

    function handleCloseModal() {
        setIsModalVisible(false);
        setSelectedOrder(null);
    }

    async function handleChangeOrderStatus() {
        setIsLoading(true);
        const newStatus =
            selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

        api.patch(`/orders/${selectedOrder?._id}`, { status: newStatus });

        toast.success(
            `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`
        );
        onChangeOrderStatus(selectedOrder!._id, newStatus);
        onCancelOrder(selectedOrder!._id);
        setIsLoading(false);
        setIsModalVisible(false);
    }

    async function handleCancelOrder() {
        setIsLoading(true);

        await api.delete(`/orders/${selectedOrder?._id}`);

        // esse ! é somente para evitar que o typescypte reconheça como erro
        // tendo em vista que pode ser nulo(reclama do optional chainning)
        toast.warning(
            `O pedido da mesa ${selectedOrder?.table} foi cancelado!`
        );
        onCancelOrder(selectedOrder!._id);
        setIsLoading(false);
        setIsModalVisible(false);
    }
    return (
        <Board>
            <OrderModal
                visible={isModalVisible}
                order={selectedOrder}
                onClose={handleCloseModal}
                onCancelOrder={handleCancelOrder}
                isLoading={isLoading}
                onChangeOrderStatus={handleChangeOrderStatus}
            />
            <header>
                <span>{icon}</span>
                <strong>{title}</strong>
                <span>({orders.length})</span>
            </header>

            {orders.length > 0 && (
                <OrdersContainer>
                    {orders.map((order) => (
                        <button
                            type="button"
                            key={order._id}
                            onClick={() => handleOpenModal(order)}
                        >
                            <strong>Mesa {order.table}</strong>
                            <span>{order.products.length} itens</span>
                        </button>
                    ))}
                </OrdersContainer>
            )}
        </Board>
    );
}
