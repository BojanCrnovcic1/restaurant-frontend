import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './category.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ApiConfig } from '../../config/api.config';
import { useAuth } from '../../context/AuthContext';
import { CategoryType } from '../../types/CategoryType';

interface EditCategoryProps {
    show: boolean;
    handleClose: () => void;
    categoryId: number;
}

const EditCategory: React.FC<EditCategoryProps> = ({ show, handleClose, categoryId }) => {
    const { token } = useAuth();
    const [name, setName] = useState<string>("");
    const [parentCategoryId, setParentCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            if (categoryId !== null) {
                try {
                    const response = await axios.get(`${ApiConfig.API_URL}api/category/${categoryId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setName(response.data.name);
                    setParentCategoryId(response.data.parentCategoryId);
                } catch (error) {
                    console.error('Failed to fetch category details', error);
                }
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${ApiConfig.API_URL}api/category`);
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

        fetchCategoryDetails();
        fetchCategories();
    }, [categoryId, token]);

    const updateCategory = async () => {
        if (categoryId === null) {
            return;
        }

        try {
            await axios.patch(`${ApiConfig.API_URL}api/category/${categoryId}`, {
                name: name,
                parentCategoryId: parentCategoryId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            handleClose();
        } catch (error) {
            console.error('Failed to update category', error);
        }
    };

    return (
        <div className={`modal ${show ? 'show' : 'hide'}`}>
            <div className='modal-container'>
                <span className='close' onClick={handleClose}><FontAwesomeIcon icon={faClose} /></span>
                <h2>Edit category</h2>
                <div className='modal-card'>
                    <form>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor='parentCategoryId'>Parent category:</label>
                        <select
                            id='parentCategoryId'
                            value={parentCategoryId ?? ''}
                            onChange={(e) => setParentCategoryId(Number(e.target.value) || null)}
                        >
                            <option value="">No parent category</option>
                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId?.toString()}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <button type='button' onClick={updateCategory}>
                            <FontAwesomeIcon icon={faSave} /> Save changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCategory;
