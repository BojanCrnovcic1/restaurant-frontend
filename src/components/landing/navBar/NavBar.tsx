import { useState } from 'react';
import { Link } from 'react-router-dom';
import './navBar.scss';
import { useAuth } from '../../../context/AuthContext';
import Cart from '../../../pages/user/cart/Cart';

const NavBar = () => {
  const { role, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Funkcija za zatvaranje menija
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='navBar'>
      <div className='navBar-left'>
        <img src="/assets/logo.png" alt="Restaurant Logo" />
        <h1><a href='#header'>Restaurant</a></h1>
      </div>
      <div className='navBar-right'>
        <div className={`navBar-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li className='list-menu'><Link to={'/menu'} onClick={closeMenu}>Menu</Link></li>
            <li className='list-about'><a href='#about' onClick={closeMenu}>About</a></li>
            <li className='list-chef'><a href='#chef' onClick={closeMenu}>Chef</a></li>
            <li className='list-laurels'><a href='#laurels' onClick={closeMenu}>Laurels</a></li>
            {role === 'user' ? (
              <>
                <li className='list-logout'><a href='#' onClick={() => { closeMenu(); logout(); }}>Logout</a></li>
                <li className='list-cart'><Cart /></li>
              </>
            ) : (
              <>
                <li className='list-login'><Link to={'/login'} onClick={closeMenu}>Login</Link></li>
                <li className='list-register'><Link to={'/register'} onClick={closeMenu}>Register</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className={`navBar-hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
