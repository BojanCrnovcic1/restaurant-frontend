import { useEffect, useState } from 'react';
import './categorySideBar.scss'
import { CategoryType } from '../../types/CategoryType';
import axios from 'axios';
import { ApiConfig } from '../../config/api.config';
import { Link } from 'react-router-dom';

interface CategorySideBarProps {
    onCategorySelect: (category: CategoryType) => void;
}

const CategorySideBar: React.FC<CategorySideBarProps> = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        handleAllCategories();
    }, [])

    const handleAllCategories = async () => {
        await axios.get(ApiConfig.API_URL + 'api/category')
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
          });
    }
  return (
    <div className='category-side-bar'>
        <h2>Menu</h2>
            <ul>
                {categories.map(category => (
                   <li className='list-category' key={category.categoryId} onClick={() => onCategorySelect(category)}>
                    <Link to={`category/${category.categoryId}`}>{category.name}</Link>
                   </li>
                ))}
            </ul>
    </div>
  )
}

export default CategorySideBar