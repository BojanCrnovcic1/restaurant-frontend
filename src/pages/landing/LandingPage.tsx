import AboutAs from '../../components/landing/aboutAs/AboutAs';
import Chef from '../../components/landing/chef/Chef';
import Footer from '../../components/landing/footer/Footer';
import Header from '../../components/landing/header/Header';
import Laurels from '../../components/landing/laurels/Laurels';
import NavBar from '../../components/landing/navBar/NavBar';
import Video from '../../components/landing/video/Video';
import './landingPage.scss';

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <AboutAs />
      <Video />
      <Chef />
      <Laurels />
      <Footer />
    </div>
  )
}

export default LandingPage