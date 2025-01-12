import React, { useEffect, useState } from 'react';
import './food.scss';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { ApiConfig } from '../../config/api.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { CategoryType } from '../../types/CategoryType';
import { FeatureType } from '../../types/FeatureType';

interface AddFoodProps {
    show: boolean;
    handleClose: () => void;
}

const AddFood: React.FC<AddFoodProps> = ({ show, handleClose }) => {
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
        const fetchCategories = async () => {
            try {
                const response = await axios.get(ApiConfig.API_URL + 'api/category');
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setCategories([]);
                }
            } catch (error) {
                console.error('Failed to fetch categories', error);
                setCategories([]);
            }
        };

        const fetchFeatures = async () => {
            try {
                const response = await axios.get(ApiConfig.API_URL + 'api/feature');
                if (Array.isArray(response.data)) {
                    setFeatures(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setFeatures([]);
                }
            } catch (error) {
                console.error('Failed to fetch features', error);
                setFeatures([]);
            }
        };

        fetchCategories();
        fetchFeatures();
    }, []);

    const handleAddFood = async () => {
        try {
            const response = await axios.post(ApiConfig.API_URL + 'api/food/createFood', {
                name,
                categoryId,
                description,
                price,
                features: selectedFeatures.map(featureId => ({ featureId }))
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                setMessage("Food added successfully!");
                setName("");
                setCategoryId(null);
                setDescription("");
                setPrice(0.1);
                setFeatures([]); 
                setSelectedFeatures([]);
            }
            handleClose();
        } catch (error) {
            setMessage("Failed to add food.");
            console.error('Failed to add food', error);
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
            <div className='modal-food-container'>
                <span className='close' onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </span>
                <h2>Add new food</h2>
                <div className='modal-food-card'>
                    <form onSubmit={(e) => { e.preventDefault(); handleAddFood(); }}>
                        <div className='form-group'>
                            <label htmlFor='add-categoryId'>Category</label>
                            <select id='add-categoryId' value={categoryId ?? ''} onChange={(e) => setCategoryId(Number(e.target.value))}>
                                <option value="" disabled>Select category</option>
                                {categories.map(category => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='add-name'>Name</label>
                            <input id='add-name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='add-description'>Detailed text</label>
                            <textarea id='add-description' value={description} onChange={(e) => setDescription(e.target.value)} rows={10} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='add-price'>Price</label>
                            <input id='add-price' type='number' min={0.01} step={0.01} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='add-features'>Features</label>
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
                        <div className='form-group'>
                            <button type='submit'>
                                <FontAwesomeIcon icon={faPlus} /> Add new food
                            </button>
                        </div>
                        {message && (
                            <div className='alert'>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;
