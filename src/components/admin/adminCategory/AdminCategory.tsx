import { useEffect, useState } from 'react';
import './adminCategory.scss';
import { CategoryType } from '../../../types/CategoryType';
import axios from 'axios';
import { ApiConfig } from '../../../config/api.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faListAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCategory from '../../../modals/category/AddCategory';
import EditCategory from '../../../modals/category/EditCategory';
import DeleteCategory from '../../../modals/category/DeleteCategory';

const AdminCategory = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [addCategoryModal, setAddCategoryModal] = useState<boolean>(false);
    const [editCategoryModal, setEditCategoryModal] = useState<boolean>(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);


    const fetchCategories = async () =>  {
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
    }

    const handleAddModal = () => {
        setAddCategoryModal(false);
    }

    const handleEditModal = () => {
        setEditCategoryModal(false);
        setSelectedCategoryId(null);
    }

    const openEditModal = (categoryId: number | undefined) => {
        if (categoryId !== undefined) {
            setSelectedCategoryId(categoryId);
            setEditCategoryModal(true);
        }
    }
    
    const handleDeleteModal = () => {
        setDeleteCategoryModal(false);
        setSelectedCategoryId(null);
    }

    const openDeleteModal = (categoryId: number | undefined) => {
        if (categoryId !== undefined) {
            setSelectedCategoryId(categoryId);
            setDeleteCategoryModal(true);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [categories]);

    return (
        <div className='adminCategory'>
            <div className='adminCategoryContainer'>
                <h2>
                    <FontAwesomeIcon icon={ faListAlt } /> Categories
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th className='table-add-button'>
                                <button onClick={() => setAddCategoryModal(true)}><FontAwesomeIcon icon={ faPlus } /> Add</button>
                            </th>
                            {addCategoryModal && (
                                    <AddCategory show={addCategoryModal} handleClose={handleAddModal} />
                                )}
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Parent ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.categoryId}>
                                <td>{category.categoryId}</td>
                                <td>{category.name}</td>
                                <td>{category.parentCategoryId}</td>
                                <td>
                                    <button className='button-edit'  onClick={() => openEditModal(category.categoryId)}>
                                        <FontAwesomeIcon icon={ faEdit } /> Edit
                                    </button>
                                    {editCategoryModal && selectedCategoryId === category.categoryId && (
                                        <EditCategory show={editCategoryModal} handleClose={handleEditModal} categoryId={category.categoryId} />
                                    )}
                                </td>
                                <td>
                                    <button className='button-delete' onClick={() => openDeleteModal(category.categoryId)}>
                                        <FontAwesomeIcon icon={ faDeleteLeft } /> Delete
                                    </button>
                                    {deleteCategoryModal && selectedCategoryId === category.categoryId && (
                                        <DeleteCategory show={deleteCategoryModal} handleClose={handleDeleteModal} categoryId={category.categoryId} />
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

export default AdminCategory;
