import React, { useState } from 'react';
import './feature.scss';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ApiConfig } from '../../config/api.config';

interface AddFeatureProps {
    show: boolean;
    handleClose: () => void;
}


const AddFeature: React.FC<AddFeatureProps> = ({ show, handleClose }) => {
    const { token } = useAuth();
    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleAddFeature = async () => {
        try {
            const response = await axios.post(ApiConfig.API_URL + 'api/feature/createFeature', {
                name: name
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                setMessage("Feature added successfully!");
                setName("");
                handleClose();
            }
        } catch (error) {
            setMessage("Failed to add feature.");
            console.error('Failed to add feature', error);
        }
    }
  return (
    <div className={`modal-feature ${show ? 'show' : 'hide'}`}>
        <div className='modal-container-feature'>
            <span className='close' onClick={handleClose}><FontAwesomeIcon icon={faClose} /></span>
            <h2>Add new feature</h2>
            <div className='modal-card-feature'>
                <form>
                    <label htmlFor='name'>Name: </label>
                    <input 
                        id='name'
                        type='text' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />                   
                    <button type='button' onClick={handleAddFeature}>
                        <FontAwesomeIcon icon={ faPlus } />Add new feature
                    </button>
                    {message && (
                            <div className='alert'>
                                {message}
                            </div>
                    )}
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddFeature