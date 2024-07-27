import { useInView } from 'react-intersection-observer';
import './laurels.scss';

const Laurels = () => {
  const { ref: leftRef, inView: leftInView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const { ref: centerRef, inView: centerInView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const { ref: rightRef, inView: rightInView } = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <div className='laurels' id='laurels'>
      <div className='laurels-left'>
        <div ref={leftRef} className={`left-center ${leftInView ? 'animate' : ''}`}>
          <img src="/src/assets/award02.png" alt="Award 02" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div className='laurels-center'>
        <div ref={centerRef} className={`center-center ${centerInView ? 'animate' : ''}`}>
          <img src="/src/assets/award01.png" alt="Award 01" />
          <p>Numquam, voluptates impedit dolorum iste et assumenda excepturi repellat. 
          Deserunt illo obcaecati quod quos aliquid porro! Beatae laudantium ipsum quisquam!</p>
        </div>
      </div>
      <div className='laurels-right'>
        <div ref={rightRef} className={`right-center ${rightInView ? 'animate' : ''}`}>
          <img src="/src/assets/award05.png" alt="Award 05" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit accusantium 
          voluptates! Iste, atque.</p>
        </div>
      </div>
    </div>
  )
}

export default Laurels;
