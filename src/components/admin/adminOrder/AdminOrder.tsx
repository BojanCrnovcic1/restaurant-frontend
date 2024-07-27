import { useEffect, useState, useRef } from 'react';
import './adminOrder.scss';
import { useAuth } from '../../../context/AuthContext';
import { OrderType } from '../../../types/OrderType';
import axios from 'axios';
import { ApiConfig } from '../../../config/api.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

const AdminOrder = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
    const [newStatus, setNewStatus] = useState<'pending' | 'rejected' | 'accepted' | 'shipped'>('pending');
    const orderDetailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(ApiConfig.API_URL + 'api/admin/order', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    };

    const fetchOrderById = async (orderId: number) => {
        try {
            const response = await axios.get(ApiConfig.API_URL + `api/admin/order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSelectedOrder(response.data);
        } catch (error) {
            console.error('Error fetching order details', error);
        }
    };

    const changeOrderStatus = async () => {
        if (!selectedOrder) return;

        try {
            await axios.patch(ApiConfig.API_URL + `api/admin/order/${selectedOrder.orderId}`, { newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchAllOrders();
            setSelectedOrder(null);
        } catch (error) {
            console.error('Error updating order status', error);
        }
    };

    useEffect(() => {
        if (selectedOrder && orderDetailsRef.current) {
            orderDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedOrder]);


    return (
        <div className='adminOrder'>
            <div className='adminOrderContainer'>
                <h1><FontAwesomeIcon icon={faCartArrowDown} /> Orders</h1>
                <div className='order-wrapper'>
                    <table className='order-table'>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th><FontAwesomeIcon icon={faBoxOpen}/>Cart</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.createdAt ? new Date(order.createdAt).toISOString().substring(0, 10) : 'N/A'}</td>
                                    <td className={`status-${order.status}`}>{order.status}</td>
                                    <td>
                                        <button onClick={() => fetchOrderById(order.orderId!)}>
                                            <FontAwesomeIcon icon={faBoxOpen} /> View Cart
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => { setSelectedOrder(order); setNewStatus(order.status!); }}>
                                            Change Status
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedOrder && (
                    <div ref={orderDetailsRef} className='order-details'>
                        <h2>Order Details</h2>
                        <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                        <p><strong>Date:</strong> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toISOString().substring(0, 10) : 'N/A'}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                        <p><strong>User:</strong> {selectedOrder.cart?.user.email}</p>
                        <h3>Cart Items</h3>
                        <ul>
                            {selectedOrder.cart?.cartFoods.map(cartFood => (
                                <li key={cartFood.cartFoodId}>
                                    {cartFood.food.name} ({cartFood.food.category.name}) - {cartFood.quantity} x {cartFood.food.foodPrices[0].price}
                                </li>
                            ))}
                        </ul>
                        <div>
                            <label htmlFor="status">Change Status:</label>
                            <select
                                id="status"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value as 'pending' | 'rejected' | 'accepted' | 'shipped')}
                            >
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="shipped">Shipped</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            <button onClick={changeOrderStatus}>Update Status</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminOrder;


