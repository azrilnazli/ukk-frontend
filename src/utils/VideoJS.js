import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import apiClient from '../services/api';

export const VideoJS = ( props ) => {

  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;



  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready " );

        onReady && onReady(player);
      });
    } else {

      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
      
    }
  }, [options, videoRef]);


  React.useEffect(() => {
    const interval = setInterval(() => {
      apiClient.post('/api/movies/statistics', {
        //user_id:  profile.id,
        video_id: sessionStorage.getItem('video_id'),
        timestamp: sessionStorage.getItem('timestamp'),
        duration:sessionStorage.getItem('watchtime')
      });
      console.log('Stored in DB');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
      
    };
  }, [playerRef]);

//   React.useEffect(() => {
//     const player = playerRef.current;
//     player.Hls.xhr.beforeRequest = (options) => {
//             if (!options.headers){
//                 options.headers = {}
//             }
//             options.headers["x-playback-session-id"] = "1234"
//         }

//         return options;
//     });

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}

export default VideoJS;
