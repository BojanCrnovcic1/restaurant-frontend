import './adminSideBar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const AdminSideBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

  return (
    <div className='adminSideBar'>
        <h1>Admin Services:</h1>
        <div className='adminSideBarContainer'>
            <ul>
                <li><Link to={'categories'}>Categories</Link></li>
                <li><Link to={'foods'}>Foods</Link></li>
                <li><Link to={'features'}>Features</Link></li>
                <li><Link to={'orders'}>Orders</Link></li>
            </ul>
        </div>
        <div className='adminLogout'>
            <button type='button' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default AdminSideBar
