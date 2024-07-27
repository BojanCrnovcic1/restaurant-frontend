import { useEffect, useState } from 'react';
import './category.scss';
import { CategoryType } from '../../types/CategoryType';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiConfig } from '../../config/api.config';
import SingleFoodPreview from '../singleFoodPreview/SingleFoodPreview';
import { FoodType } from '../../types/FoodType';

const Category = () => {
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const { id: categoryId } = useParams<{ id: string }>();
  const catId = Number(categoryId);

  const fetchCategory = async (categoryId: number) => {
    try {
      await axios.get(ApiConfig.API_URL + `api/category/${categoryId}`)
        .then((response: any) => {
          setCategory(response.data);
        })
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  }

  const fetchFoods = async () => {
    try {
      await axios.get(ApiConfig.API_URL + 'api/food', {
        
      })
        .then((res: any) => {
          setFoods(res.data);
        })
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  }

  useEffect(() => {
    if (catId) {
      fetchCategory(catId);
      fetchFoods();
    }
  }, [catId]);

  if (!category) {
    return <div>Loading...</div>;
  }

  const filteredFoods = foods.filter(food => food.categoryId === catId);

  return (
    <div className='category'>
      <div className='category-card'>
        <h2>{category.name}</h2>
        <div className='category-foods'>
          {filteredFoods.length === 0 ? (
            <p>There are no foods in this category.</p>
          ) : (
            filteredFoods.map(food => (
              <ul key={food.foodId}>
                <SingleFoodPreview food={food} />
              </ul>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Category;


