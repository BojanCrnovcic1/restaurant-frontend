import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './feature.scss';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { ApiConfig } from '../../config/api.config';

interface EditFeatureProps {
    show: boolean;
    handleClose: () => void;
    featureId: number;
}

const EditFeature:React.FC<EditFeatureProps> = ({ show, handleClose, featureId }) => {
    const { token } = useAuth();
    const [name, setName] = useState<string>("");

    const handleEditFeature = async () => {

        if (featureId=== null) {
            return;
        }
        try {
           await axios.patch(ApiConfig.API_URL + `api/feature/${featureId}/editFeature`, {
            name: name,
           }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
           }) 
        } catch (error) {
            console.error('Failed to update category', error);
        }
    }
    
  return (
    <div className={`modal-feature ${show ? 'show' : 'hide'}`}>
        <div className='modal-container-feature'>
            <span className='close' onClick={handleClose}><FontAwesomeIcon icon={faClose} /></span>
            <h2>Edit feature</h2>
            <div className='modal-card-feature'>
                <form>
                    <label htmlFor='name'>Name: </label>
                    <input 
                        id='name'
                        type='text' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    <button type='button' onClick={handleEditFeature}>
                        <FontAwesomeIcon icon={ faSave } />Save Changes
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditFeature