import { FiFacebook, FiInstagram, FiMail, FiTwitter } from 'react-icons/fi';
import './footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-center'>
            <div className='footer-contact'>
                <h3>Contact</h3>
                <div className='footer-icons'>
                <FiFacebook />
                <FiTwitter />
                <FiInstagram />
                <FiMail />
                </div>
            </div>
            <div className='footer-working'>
                <h3>Working Hours</h3>
                <p>Monday-Friday:</p>
                <p>08:00 am - 12:00 am</p>
                <p>Saturday-Sunday:</p>
                <p>07:00 am - 11:00 pm</p>
            </div>
        </div>
        <div className='copyright'>
            <div className='copy'>
                 <p>@Copyright 2024. bojan.crnovcic4@gmail.com</p>
            </div>
        </div>
    </div>
  )
}

export default Footer