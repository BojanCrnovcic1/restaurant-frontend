import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './deleteCategory.scss';
import axios from 'axios';
import React from 'react';
import { ApiConfig } from '../../config/api.config';
import { useAuth } from '../../context/AuthContext';

interface DeleteCategoryProps {
    show: boolean;
    handleClose: () => void;
    categoryId: number | null;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({ show, handleClose, categoryId }) => {
    const { token } = useAuth();

    const deleteCategory = async () => {
        if (categoryId === null) {
            return;
        }

        try {
            await axios.delete(`${ApiConfig.API_URL}api/category/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            handleClose();
        } catch (error) {
            console.error('Failed to delete category', error);
        }
    };

    return (
        <div className={`delete-modal ${show ? 'show' : 'hide'}`}>
            <div className='delete-modal-container'>
                <span className='close' onClick={handleClose}><FontAwesomeIcon icon={faClose} /></span>
                <h2>Delete category</h2>
                <div className='delete-modal-card'>
                    <p>Are you sure you want to delete this category?</p>
                    <div className='delete-modal-actions'>
                        <button type='button' onClick={deleteCategory}>
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

export default DeleteCategory;
