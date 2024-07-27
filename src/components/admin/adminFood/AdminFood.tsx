import { useEffect, useState } from 'react';
import { FoodType } from '../../../types/FoodType';
import './adminFood.scss';
import { ApiConfig } from '../../../config/api.config';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faImages, faListAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AddFood from '../../../modals/food/AddFood';
import EditFood from '../../../modals/food/EditFood';
import DeleteFood from '../../../modals/food/DeleteFood';

const AdminFood = () => {
    const [foods, setFoods] = useState<FoodType[]>([]);
    const [addFoodModal, setAddFoodModal] = useState<boolean>(false);
    const [editFoodModal, setEditFoodModal] = useState<boolean>(false);
    const [deleteFoodModal, setDeleteFoodModal] = useState<boolean>(false);
    const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);

    const fetchFoods = async () =>  {
        try {
            const response = await axios.get(ApiConfig.API_URL + 'api/food');
            if (Array.isArray(response.data)) {
                setFoods(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
                setFoods([]);
            }
        } catch (error) {
            console.error('Failed to fetch foods', error);
            setFoods([]);
        }
    }

    const handleAddModal = () => {
        setAddFoodModal(false);
    }

    const handleEditModal = () => {
        setEditFoodModal(false);
        setSelectedFoodId(null);
    }

    const openEditModal = (foodId: number | undefined) => {
        if (foodId !== undefined) {
            setSelectedFoodId(foodId);
            setEditFoodModal(true);
        }
    }

    const handleDeleteModal = () => {
        setDeleteFoodModal(false);
        setSelectedFoodId(null);
    }

    const openDeleteModal = (foodId: number | undefined) => {
        if (foodId !== undefined) {
            setSelectedFoodId(foodId);
            setDeleteFoodModal(true);
        }
    }


    useEffect(() => {
        fetchFoods();
    }, [foods]);

  return (
    <div className='adminFoods'>
        <div className='adminFoodsContainer'>
            <h2>
                <FontAwesomeIcon icon={ faListAlt } /> Foods
            </h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th className='table-add-button'>
                            <button onClick={() => setAddFoodModal(true)}><FontAwesomeIcon icon={ faPlus } /> Add</button>
                        </th>
                        {addFoodModal && (
                            <AddFood show={addFoodModal} handleClose={handleAddModal} />
                        )}
                    </tr>
                    <tr>
                        <th className="text-right">ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food) => (
                        <tr key={food.foodId}>
                            <td className="text-right">{food.foodId}</td>
                            <td>{food.name}</td>
                            <td>{food.category?.name}</td>
                            <td className="text-right">
                            {food.foodPrices && food.foodPrices.length > 0 
                                        ? food.foodPrices[food.foodPrices.length - 1].price 
                                        : 'N/A'}
                            </td>
                            <td className='text-centar'>
                                <Link to={`/admin/dashboard/food/${food.foodId}/photos`}><FontAwesomeIcon icon={ faImages } /> Photo</Link>
                            </td>
                            <td className='edit-button'>
                                <button onClick={() => openEditModal(food.foodId)}>
                                     <FontAwesomeIcon icon={ faEdit } /> Edit
                                </button>
                                {editFoodModal && selectedFoodId === food.foodId && (
                                    <EditFood show={editFoodModal} handleClose={handleEditModal} foodId={food.foodId} />
                                )}
                            </td>
                            <td className='delete-button'>
                                <button onClick={() => openDeleteModal(food.foodId)}>
                                    <FontAwesomeIcon icon={ faDeleteLeft } /> Delete 
                                </button>
                                {deleteFoodModal && selectedFoodId === food.foodId && (
                                        <DeleteFood show={deleteFoodModal} handleClose={handleDeleteModal} foodId={food.foodId} />
                                    )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminFood;