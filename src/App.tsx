import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landing/LandingPage';
import Menu from './pages/menu/Menu';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import Cart from './pages/user/cart/Cart';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './misc/protected.route';
import AdminDashbourd from './pages/administrator/AdminDshbourd';
import Category from './components/category/Category';
import AdminCategory from './components/admin/adminCategory/AdminCategory';
import AdminFood from './components/admin/adminFood/AdminFood';
import AdminPhoto from './components/admin/adminPhoto/AdminPhoto';
import AdminFeature from './components/admin/adminFeature/AdminFeature';
import AdminOrder from './components/admin/adminOrder/AdminOrder';

const App: React.FC = () => {
  const { token, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && role === 'admin' && !window.location.pathname.startsWith('/admin/dashboard')) {
      navigate('/admin/dashboard');
    }
  }, [token, role, navigate]);

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/menu/*' element={<Menu />}>
         <Route path='category/:id' element={<Category />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
     
      <Route path='/cart' element={<ProtectedRoute allowedRoles={['user']}><Cart /></ProtectedRoute>} />
      <Route path='/admin/dashboard/*' element={<ProtectedRoute allowedRoles={['admin']}><AdminDashbourd/></ProtectedRoute>}>
         <Route path='categories' element={<AdminCategory />} />
         <Route path='foods' element={<AdminFood />}></Route>
         <Route path='food/:id/photos' element={<AdminPhoto />} />
         <Route path='features' element={<AdminFeature />} />
         <Route path='orders' element={<AdminOrder />} />
      </Route>
    </Routes>
  );
};

export default App;
