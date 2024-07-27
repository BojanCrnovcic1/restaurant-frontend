import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';
import './menu.scss';
import CategorySideBar from '../../components/categorySideBar/CategorySideBar';
import NavBar from '../../components/landing/navBar/NavBar';
import { useAuth } from '../../context/AuthContext';
import { CategoryType } from '../../types/CategoryType';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(null);
  const { token } = useAuth();


  const handleCategorySelect = (category: CategoryType) => {
    setActiveCategory(category);
  };

  return (
    <div className='menu'>
      {token && <NavBar />}
      <div className='menu-container'>
        <CategorySideBar onCategorySelect={handleCategorySelect} />
        <div className='menu-content'>
          <div className='content'>
            {activeCategory ? (
              <Outlet />
            ) : (
              <div className='first-message'>
                  <img src="src/assets/menu-pic.png" alt="Placeholder" className="placeholder-image" />
                  <h4>Explore our menu</h4>
              </div>
            )}
          </div>
        </div>
          <div className='go-back'>
            <Link to={'/'}>
              <FontAwesomeIcon icon={faBackward} /> back
            </Link>        
        </div>
      </div>
    </div>
  );
};

export default Menu;


