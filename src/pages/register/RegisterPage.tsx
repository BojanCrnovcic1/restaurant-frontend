import { useInView } from 'react-intersection-observer';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ApiConfig } from '../../config/api.config';

const RegisterPage = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [forename, setForename] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [postalAddress, setPostalAddress] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");
  const navigate = useNavigate();

  const doRegister = async () => {
    try {
        const registerData = {
            email,
            password,
            forename,
            surname,
            phoneNumber,
            postalAddress
        };
        console.log('Data being sent:', registerData); 

        const response = await axios.post(`${ApiConfig.API_URL}auth/register`, registerData);
        console.log('Registration successful:', response.data);
        navigate('/login');
    } catch (error) {
        console.error('Registration failed:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.log('Server response:', error.response.data);
            setMessageError(error.response.data.message || 'Registration failed. Please check your details and try again.');
        } else {
            setMessageError('Registration failed. Please check your details and try again.');
        }
    }
};


  return (
    <div className='register'>
      <div className='register-left'>
        <div className='register-card'>
          <h1>Register</h1>
          <form>
            <label htmlFor='email'>Email:</label>
            <input 
              type='email' 
              id='email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <label htmlFor='password'>Password:</label>
            <input 
              type='password' 
              id='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <label htmlFor='forename'>Forename:</label>
            <input 
              type='text' 
              id='forename' 
              value={forename} 
              onChange={(e) => setForename(e.target.value)} 
              required 
            />
            <label htmlFor='surname'>Surname:</label>
            <input 
              type='text' 
              id='surname' 
              value={surname} 
              onChange={(e) => setSurname(e.target.value)} 
              required 
            />
            <label htmlFor='phoneNumber'>Phone number:</label>
            <input 
              type='text' 
              id='phoneNumber' 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              required 
            />
            <label htmlFor='postalAddress'>Postal Address:</label>
            <input 
              type='text' 
              id='postalAddress' 
              value={postalAddress} 
              onChange={(e) => setPostalAddress(e.target.value)} 
              required 
            />
            <button type='button' onClick={doRegister}>Register</button>
          </form>
          {messageError && <div className="error">{messageError}</div>}
          <div className='register-back'>
            <span>Do you have an account?</span>
            <Link to={'/login'}>
              <p>Click here...</p>
            </Link>
          </div>
          <div className='go-back'>
            <Link to={'/'}>
              <FontAwesomeIcon icon={faBackward} />   back
            </Link>
          </div>
        </div>
      </div>
      <div className='register-right'>
        <div ref={ref} className={`register-image ${inView ? 'animate' : ''}`}>
          <img src="src/assets/register.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
