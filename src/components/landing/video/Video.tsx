import { MutableRefObject, useRef, useState } from 'react'
import './video.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const Video = () => {
    const [playVideo, setPlayVideo] = useState<boolean>(false);
    const vidRef = useRef<HTMLVideoElement | null>(null);

    const handleVideoPlayPause = () => {
      setPlayVideo(!playVideo);
      if (vidRef.current) {
        if (playVideo) {
          vidRef.current.pause();
        } else {
          vidRef.current.play();
        }
      }
    };

    return (
        <div className="video">
          <video
            ref={vidRef as MutableRefObject<HTMLVideoElement>}
            src="/assets/meal.mp4"
            loop
            controls={false}
            muted
          />
          <div className="video-center">
            <div
              className="video-center-circle"
              onClick={handleVideoPlayPause}
            >
              {playVideo ? (
                <FontAwesomeIcon icon={faPause} color='#fff' fontSize={30}/>
              ) : (
                <FontAwesomeIcon icon={faPlay} color='#fff' fontSize={30}/>
              )}
            </div>
          </div>
        </div>
      );
}

export default Video