import { useInView } from 'react-intersection-observer';
import './chef.scss';

const Chef = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className='chef' id='chef'>
      <div className='chef-left'>
        <div ref={ref} className={`chef-image ${inView ? 'animate' : ''}`}>
          <img src="/assets/chef.png" alt="Chef" />
        </div>
      </div>
      <div className='chef-right'>
        <div className='chef-text'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
             Facere excepturi illo a accusamus accusantium veritatis error? Quae cupiditate non,
             aut eveniet modi perferendis maxime soluta cumque repellat quas! Iusto, expedita.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chef;
