import React, { useEffect, useState } from 'react';
import './food.scss';
import { useAuth } from '../../context/AuthContext';
import { CategoryType } from '../../types/CategoryType';
import { FeatureType } from '../../types/FeatureType';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ApiConfig } from '../../config/api.config';

interface EditFoodProps {
    show: boolean;
    handleClose: () => void;
    foodId: number;
}

const EditFood: React.FC<EditFoodProps> = ({ show, handleClose, foodId }) => {
    const { token } = useAuth();
    const [name, setName] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0.1);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [features, setFeatures] = useState<FeatureType[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if (foodId) {
            fetchFoodDetails(foodId);
            fetchCategories();
            fetchFeatures();
        }
    }, [foodId]);

    const fetchFoodDetails = async (userId: number) => {
        try {
            const response = await axios.get(ApiConfig.API_URL + `api/food/${userId}`);
            const food = response.data;
            setName(food.name);
            setCategoryId(food.categoryId);
            setDescription(food.description);
            setPrice(food.foodPrices[food.foodPrices.length - 1].price);
            setSelectedFeatures(food.features.map((feature: FeatureType) => feature.featureId));
        } catch (error) {
            console.error("Error fetching food details", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(ApiConfig.API_URL + 'api/category');
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const fetchFeatures = async () => {
        try {
            const response = await axios.get(ApiConfig.API_URL + 'api/feature');
            setFeatures(response.data);
        } catch (error) {
            console.error("Error fetching features", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            name,
            categoryId,
            description,
            price,
            features: selectedFeatures.map(featureId => ({ featureId }))
        };

        try {
             await axios.patch(ApiConfig.API_URL + `api/food/${foodId}/editFood`, data, {
                headers: { 
                    Authorization: `Bearer ${token}`
                 }
            });
            setMessage("Food updated successfully!");
        } catch (error) {
            setMessage("Error updating food");
            console.error("Error updating food", error);
        }
    };

    const handleFeatureToggle = (featureId: number) => {
        setSelectedFeatures((prevSelectedFeatures) => {
            if (prevSelectedFeatures.includes(featureId)) {
                return prevSelectedFeatures.filter(id => id !== featureId);
            } else {
                return [...prevSelectedFeatures, featureId];
            }
        });
    };

    return (
        <div className={`modal-food ${show ? 'show' : 'hide'}`}>
            <div className="modal-food-container">
                <span className='close' onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </span>
                <h2>Edit Food</h2>
                <div className='modal-food-card'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor='name'>Name</label>
                        <input type="text" id='name' value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor='category'>Category</label>
                        <select id='category' value={categoryId ?? ''} onChange={e => setCategoryId(Number(e.target.value))} required>
                            <option value="" disabled>Select category</option>
                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId?.toString()}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor='desc'>Description</label>
                        <textarea id='desc' value={description} onChange={e => setDescription(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor='price'>Price</label>
                        <input id='price' type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor='feature'>Features</label>
                        <div className='features-container'>
                                {features.map(feature => (
                                    <div
                                        key={feature.featureId}
                                        className={`feature-option ${selectedFeatures.includes(feature.featureId!) ? 'selected' : ''}`}
                                        onClick={() => feature.featureId && handleFeatureToggle(feature.featureId)}
                                    >
                                        {feature.name}
                                    </div>
                                ))}
                            </div>
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleClose}>Cancel</button>
                </form>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default EditFood;
