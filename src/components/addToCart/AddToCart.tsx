import React, { useState } from 'react'
import { FoodType } from '../../types/FoodType'
import axios from 'axios';
import './addToCart.scss';
import { ApiConfig } from '../../config/api.config';
import { useAuth } from '../../context/AuthContext';

interface AddToCartProps {
    food: FoodType;
}

const AddToCart: React.FC<AddToCartProps> = ( { food }) => {
    const { token } = useAuth();
    const [quantity, setQuantity] = useState<number>(1);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
      };

    const addToCart = async () => {
        const data = {
            foodId: food.foodId,
            quantity,
        };

        try {
            await axios.post(ApiConfig.API_URL + 'api/cart/addToCart', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            window.dispatchEvent(new CustomEvent('cart.update'));
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

  return (
    <div className='addToCart'>
        <div className='addToCart-card'>
            <input type="number" min="1" step="1" value={quantity} 
                    onChange={handleQuantityChange} placeholder='quantity...'/>
            <button type='button' onClick={addToCart}>add</button>
        </div>        
    </div>
  )
}

export default AddToCart