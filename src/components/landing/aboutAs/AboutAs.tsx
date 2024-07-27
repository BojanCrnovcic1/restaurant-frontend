import { useInView } from 'react-intersection-observer';
import './aboutAs.scss';

const AboutAs = () => {
  const { ref: leftRef, inView: leftInView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const { ref: centerRef, inView: centerInView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const { ref: rightRef, inView: rightInView } = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <div className='aboutAs' id='about'>
      <div className='about-left'>
        <div ref={leftRef} className={`about-left-text ${leftInView ? 'animate' : ''}`}>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Deserunt maxime tempore, praesentium magni in quo eveniet ab quas impedit. 
              Delectus labore esse porro impedit placeat ullam animi unde aspernatur sunt.</p>
        </div>
      </div>
      <div className='about-center'>
        <div ref={centerRef} className={`about-image ${centerInView ? 'animate' : ''}`}>
          <img src="src/assets/findus.png" alt="" />
        </div>
      </div>
      <div className='about-right'>
        <div ref={rightRef} className={`about-right-text ${rightInView ? 'animate' : ''}`}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Ex aspernatur repellendus, harum debitis iste temporibus, 
              quos quisquam labore, non ipsam et deserunt? 
              Laborum, quisquam facere modi atque earum omnis ullam.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutAs;
