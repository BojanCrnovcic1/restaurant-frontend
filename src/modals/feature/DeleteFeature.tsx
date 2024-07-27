import React from 'react';
import './deleteFeature.scss';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { ApiConfig } from '../../config/api.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';

interface DeleteFeatureProps {
    show: boolean;
    handleClose: () => void;
    featureId: number | null;
}

const DeleteFeature: React.FC<DeleteFeatureProps> = ({ show, handleClose, featureId }) => {
    const { token } = useAuth();

    const deleteFeature = async () => {

        if (featureId === null) {
            return;
        }

        try {
            await axios.delete(ApiConfig.API_URL + `api/feature/${featureId}/deleteFeature`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            handleClose();
        } catch (error) {
            console.error('Failed to delete feature', error);
        }
    }
    
  return (
    <div className={`delete-modal ${show ? 'show' : 'hide'}`}>
            <div className='delete-modal-container'>
                <span className='close' onClick={handleClose}><FontAwesomeIcon icon={faClose} /></span>
                <h2>Delete category</h2>
                <div className='delete-modal-card'>
                    <p>Are you sure you want to delete this feature?</p>
                    <div className='delete-modal-actions'>
                        <button type='button' onClick={deleteFeature}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                        <button type='button' onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default DeleteFeature