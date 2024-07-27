import { useEffect, useState } from 'react';
import './adminFeature.scss';
import { FeatureType } from '../../../types/FeatureType';
import axios from 'axios';
import { ApiConfig } from '../../../config/api.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faListAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddFeature from '../../../modals/feature/AddFeature';
import EditFeature from '../../../modals/feature/EditFeature';
import DeleteFeature from '../../../modals/feature/DeleteFeature';

const AdminFeature = () => {
    const [features, setFeatures] = useState<FeatureType[]>([]);
    const [addFeatureModal, setAddFeatureModal] = useState<boolean>(false);
    const [editFeatureModal, setEditFeatureModal] = useState<boolean>(false);
    const [deleteFeatureModal, setDeleteFeatureModal] = useState<boolean>(false);
    const [selectedFeatureId, setSelectedFeatureId] = useState<number | null>(null);

    const fetchFeatures = async () => {
        try {
            const response = await axios.get(ApiConfig.API_URL + 'api/feature');
            if (Array.isArray(response.data)) {
                setFeatures(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('Failed to fetch features', error);
            setFeatures([]);
        }
    }

    const handleAddModal = () => {
        setAddFeatureModal(false);
    }

    const handleEditModal = () => {
        setEditFeatureModal(false);
        setSelectedFeatureId(null);
    }

    const openEditModal = (featureId: number | undefined) => {
        if (featureId !== undefined) {
            setSelectedFeatureId(featureId);
            setEditFeatureModal(true);
        }
    }

    const handleDeleteModal = () => {
        setDeleteFeatureModal(false);
        setSelectedFeatureId(null);
    }

    const openDeleteModal = (featureId: number | undefined) => {
        if (featureId !== undefined) {
            setSelectedFeatureId(featureId);
            setDeleteFeatureModal(true);
        }
    }

    useEffect(() => {
        fetchFeatures();
    }, [features])

  return (
    <div className='adminFeature'>
        <div className='adminFeatureContainer'>
            <h2>
                <FontAwesomeIcon icon={ faListAlt } /> Features
            </h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th className='table-add-button'>
                            <button onClick={() => setAddFeatureModal(true)}><FontAwesomeIcon icon={ faPlus } />Add</button>
                        </th>
                        {addFeatureModal && (
                            <AddFeature show={addFeatureModal} handleClose={handleAddModal} />
                        )}
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {features.map((feature) => (
                        <tr key={feature.featureId}>
                            <td>{feature.featureId}</td>
                            <td>{feature.name}</td>
                            <td className='button-edit'>
                                <button onClick={() => openEditModal(feature.featureId)}><FontAwesomeIcon icon={ faEdit } /> Edit</button>
                                {editFeatureModal && selectedFeatureId === feature.featureId && (
                                    <EditFeature show={editFeatureModal} handleClose={handleEditModal} featureId={feature.featureId} />
                                )}
                            </td>
                            <td className='button-delete'>
                                <button onClick={() => openDeleteModal(feature.featureId)}><FontAwesomeIcon icon={ faDeleteLeft } /> Delete</button>
                                {deleteFeatureModal && selectedFeatureId === feature.featureId && (
                                    <DeleteFeature show={deleteFeatureModal} handleClose={handleDeleteModal} featureId={feature.featureId} />
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

export default AdminFeature