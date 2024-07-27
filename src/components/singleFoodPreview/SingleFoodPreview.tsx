import React from 'react';
import './singleFoodPreview.scss';
import { FoodType } from '../../types/FoodType';
import { ApiConfig } from '../../config/api.config';
import { useAuth } from '../../context/AuthContext';
import AddToCart from '../addToCart/AddToCart';

interface Props {
  food: FoodType;
}

const SingleFoodPreview: React.FC<Props> = ({ food }) => {
    const { token } = useAuth()
    const imagePath: any = food.photos && food.photos.length > 0 ? food.photos[0].imagePath : null;
 return (
    <li key={food.foodId}>
      <div className='food-container'>
        <h3>{food.name}</h3>
        <div className='food-info'>
        {imagePath ? (
            <img src={ApiConfig.PHOTO_PATH + imagePath} alt={`Food ${food.foodId}`} />
          ) : (
            <div className='info-image'>No image available</div>
          )}
          <div className='food-text'>
            <div className='food-p'>
                <p>{food.description}</p>
            </div>
            <div className='food-feature'>
               <ul>
                  {food.features?.map(feature => 
                    <li key={feature.featureId}>
                        <span>{feature.name}</span>
                    </li>
                  )}
                </ul>
            </div>
          </div>
        </div>
        <div className='food-price-add-button'>
          <div className='food-price'>
             <b>Price: {food.foodPrices && Number(food.foodPrices[food.foodPrices.length-1].price).toFixed(2)} EUR</b>
          </div>
          {token && 
          <AddToCart food={food}/>
      }
        </div>
      </div>
    </li>
  );
}

export default SingleFoodPreview;