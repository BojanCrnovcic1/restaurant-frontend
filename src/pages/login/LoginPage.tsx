import { useInView } from 'react-intersection-observer';
import './login.scss'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const { ref: ref, inView: inView } = useInView({ triggerOnce: false, threshold: 0.1 });
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [messageError, setMessageError] = useState<string>("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const doLogin = async () => {
        try {
            await login(email, password);
            navigate('/');

        } catch (error) {
            console.error('Login failed:', error);
            setMessageError('Login failed. Please check your credentials.');
        }
    }
  return (
    <div className='login'>
        <div className='login-left'>
            <div ref={ref} className={`login-image ${inView ? 'animate' : ''}`}>
                <img src="src/assets/login.png" alt="" />
            </div>
        </div>
        <div className='login-right'>
            <div className='login-card'>
                <h1>Login</h1>
                <form>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='button' onClick={doLogin}>Login</button>
                </form>
                {messageError && <div className="error">{messageError}</div>}
                <div className='register-back'>
                    <span>Don't you have an account?</span>
                    <Link to={'/register'}>
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
    </div>
  )
}

export default LoginPage