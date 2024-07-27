import { Link, Outlet, useLocation } from 'react-router-dom'
import AdminSideBar from '../../components/admin/adminSideBar/AdminSideBar'
import './adminDashbourd.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

const AdminDashbourd = () => {

    const location = useLocation();
    const isDashbourdPath = location.pathname === '/admin/dashboard';

  return (
    <div className='adminDashbourd'>
      <AdminSideBar />
      <div className='adminMainContent'>
         <div className='content'>
          {isDashbourdPath ? (
               <div className='placeholder'>
                   <img src='/src/assets/food-admin-service.jpg' alt='Placeholder' />
               </div>
           ) : (
               <Outlet />
           )}
         </div>
      </div>
      <div className='go-back'>
            <Link to={'/admin/dashboard'}>
              <FontAwesomeIcon icon={faBackward} /> back
            </Link>        
        </div>
    </div>
  )
}

export default AdminDashbourd