import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './deleteFood.scss';
import axios from 'axios';
import React from 'react';
import { ApiConfig } from '../../config/api.config';
import { useAuth } from '../../context/AuthContext';

interface DeleteFoodProps {
    show: boolean;
    handleClose: () => void;
    foodId: number | null;
}

const DeleteFood: React.FC<DeleteFoodProps> = ({ show, handleClose, foodId }) => {
    const { token } = useAuth();

    const deleteFood = async () => {
        if (foodId === null) {
            return;
        }

        try {
            await axios.delete(`${ApiConfig.API_URL}api/food/${foodId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            handleClose();
        } catch (error) {
            console.error('Failed to delete food', error);
        }
    };

    return (
        <div className={`delete-modal ${show ? 'show' : 'hide'}`}>
            <div className='delete-modal-container'>
                <span className='close' onClick={handleClose}><FontAwesomeIcon icon={faClose} /></span>
                <h2>Delete food</h2>
                <div className='delete-modal-card'>
                    <p>Are you sure you want to delete this food?</p>
                    <div className='delete-modal-actions'>
                        <button type='button' onClick={deleteFood}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                        <button type='button' onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteFood;
