import { useInView } from 'react-intersection-observer';
import './header.scss'
import {  useNavigate } from 'react-router-dom';

const Header = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1, 
      });
    const navigate = useNavigate();
    
    const handleMenu = () => {
        navigate('/menu')
    }

  return (
    <div className='header' id='header'>
        <div className='header-title'>
            <h2>Welcome to our</h2>
            <h1>Restaurant</h1>
        </div>
        <div ref={ref} className={`header-button ${inView ? 'animate' : ''}`}>
            <p>the easiest way to our menu</p>
            <button type='button' onClick={handleMenu}>Click here</button>
        </div>
    </div>
  )
}

export default Header