import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './adminPhoto.scss';
import { faImage, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { ApiConfig } from '../../../config/api.config';
import { FoodType } from '../../../types/FoodType';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminPhoto = () => {
    const { token } = useAuth();
    const [food, setFood] = useState<FoodType | undefined>(undefined);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [selectedPhoto, setSelectedPhoto] = useState<string | undefined>(undefined);
    const { id } = useParams<{ id: string }>();
    const foodId = Number(id);

    const fetchFood = async () => {
        try {
            const response = await axios.get(ApiConfig.API_URL + `api/food/${foodId}`);
            setFood(response.data);
        } catch (error) {
            console.error('Failed to fetch food', error);
        }
    }

    useEffect(() => {
        fetchFood()
    },[foodId]);

    const handleDeletePhoto = async () => {
        const lastPhoto = food?.photos && food.photos.length > 0 ? food.photos[food.photos.length - 1] : undefined;

        if (lastPhoto) {
            try {
                await axios.delete(ApiConfig.API_URL + `api/food/${lastPhoto.photoId}/removePhoto`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFood((prevFood) => prevFood ? { ...prevFood, photos: prevFood.photos?.filter(photo => photo.photoId !== lastPhoto.photoId) } : undefined);
                console.log('photo is delete... ')
            } catch (error) {
                console.error('Failed to delete photo', error);
            }
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setSelectedPhoto(URL.createObjectURL(event.target.files[0]));
        } else {
            setSelectedFile(undefined);
            setSelectedPhoto(undefined);
        }
    }

    const handleUploadPhoto = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('photo', selectedFile);

            try {
                const response = await axios.post(ApiConfig.API_URL + `api/food/${foodId}/upload`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setFood((prevFood) => prevFood ? { ...prevFood, photos: [...(prevFood.photos || []), response.data] } : undefined);
                setSelectedFile(undefined);
                setSelectedPhoto(undefined);
            } catch (error) {
                console.error('Failed to upload photo', error);
            }
        }
    }

    const lastPhoto = food?.photos && food.photos.length > 0 ? food.photos[food.photos.length - 1] : undefined;

    return (
        <div className='adminPhoto'>
            <h1><FontAwesomeIcon icon={faImage} /> Photos</h1>
            <div className='adminPhotoContainer'>
                <div className='photo-section'>
                    {lastPhoto ? (
                        <>
                            <img src={lastPhoto.imagePath} alt={"Photo " + lastPhoto.photoId} />
                            <button onClick={handleDeletePhoto}><FontAwesomeIcon icon={faMinus} /> Delete photo</button>
                        </>
                    ) : (
                        <p>No photo selected</p>
                    )}
                </div>
                <div className='add-new-photo'>
                    <form>
                        <label htmlFor='photo'>Select photo: </label>
                        <input type='file' id='photo' onChange={handleFileChange}/>
                        {selectedPhoto && <img src={selectedPhoto} alt="Selected" />}
                        <button type='button' onClick={handleUploadPhoto}>Upload new photo</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminPhoto;

