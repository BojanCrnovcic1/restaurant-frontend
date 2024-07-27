import { useEffect, useState } from 'react';
import './cart.scss';
import { CartType } from '../../../types/CartType';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { ApiConfig } from '../../../config/api.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { token } = useAuth();
  const [count, setCount] = useState<number>(0);
  const [cart, setCart] = useState<CartType | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ApiConfig.API_URL + 'api/cart/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCart(response.data);
        setCount(response.data.cartFoods.length);
       
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchData();

    window.addEventListener('cart.update', fetchData);

    return () => window.removeEventListener('cart.update', fetchData);
  }, [token]);

  const calculateSum = () => {
    if (!cart) return 0;
    let sum = 0;
    for (const item of cart.cartFoods) {
      const price = item.food.foodPrices[item.food.foodPrices.length - 1]?.price;
      sum += price * item.quantity;
    }
    return sum;
  };

  const sendCartUpdate = async (data: any) => {
    try {
      const response = await axios.patch(ApiConfig.API_URL + 'api/cart/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setCart(response.data);
      setCount(response.data.cartFoods.length);
    } catch (error) {
      console.error('Error updating cart:', error);
      setCount(0);
      setCart(undefined);
    }
  };

  const updateQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const foodId = Number(event.target.dataset.foodId);
    const newQuantity = Number(event.target.value);
    sendCartUpdate({ foodId, quantity: newQuantity });
  };

  const removeFromCart = (foodId: number) => {
    sendCartUpdate({ foodId, quantity: 0 });
  };

  const makeOrder = async () => {
    try {
      await axios.post(ApiConfig.API_URL + 'api/cart/makeOrder/', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Your order has been made! Check your email.');
      setCart(undefined);
      setCount(0);
      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 3000);
    } catch (error) {
      console.error('Error making order:', error);
      setCount(0);
      setCart(undefined);
    }
  };

  const hideCart = () => {
    setMessage('');
    setVisible(false);
  };

  const sum = calculateSum();

  return (
    <>
      <span className='span-nav' onClick={() => setVisible(true)}>
        <FontAwesomeIcon icon={faCartArrowDown} /> ({count})
      </span>
      {visible && <div className="cart-modal-overlay" onClick={hideCart} />}
      <div className={`cart-modal ${visible ? '' : 'd-none'}`}>
        <div className="cart-modal-header">
          <h2>Your shopping cart</h2>
        </div>
        <div className="cart-modal-body">
          {orderSuccess && <div className="order-success-message">{message}</div>}
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Category</th>
                <th>Food</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart?.cartFoods.map((item) => {
                const priceValue = item.food.foodPrices[item.food.foodPrices.length - 1]?.price;
                const price = priceValue ? Number(priceValue).toFixed(2) : '0.00';
                const priceNum = Number(price);
                const quantityNum = Number(item.quantity);
                const total = (priceNum * quantityNum).toFixed(2);

                return (
                  <tr key={item.food.foodId}>
                    <td>{item.food.category.name}</td>
                    <td>{item.food.name}</td>
                    <td className="text-right">
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={item.quantity}
                        data-food-id={item.food.foodId}
                        onChange={updateQuantity}
                        placeholder='quantity...'
                      />
                    </td>
                    <td className="text-right">{price} EUR</td>
                    <td className="text-right">{total} EUR</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faMinusSquare}
                        onClick={() => removeFromCart(item.food.foodId)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-right">
                  <strong>Total:</strong>
                </td>
                <td className="text-right">{sum.toFixed(2)} EUR</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="cart-modal-footer">
          <button
            type='button'
            onClick={makeOrder}
            disabled={cart?.cartFoods.length === 0}
          >
            Make an order
          </button>
          <button type='button' onClick={hideCart}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
