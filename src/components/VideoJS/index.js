import React from "react";
import VideoJS from '../../utils/VideoJS' // point to where the functional component is stored
import apiClient from '../../services/api';
import config from '../../config.json'

window.addEventListener("beforeunload", (ev) => 
{  
    ev.preventDefault();

    // logic before use close browser

});

const VideoJSPlayer = (props) => {
  const playerRef = React.useRef(null);
  const token = sessionStorage.getItem('token');
  const src = config.SERVER_URL + `/api/movie/${props.id}/playlist.m3u8/${token}?access_token=${token}`
  //const src = `https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8` //test header
  //const src = `http://admin.test/api/movie/${props.id}/play` //test header

  const [profile, setProfile] = React.useState(
    JSON.parse(sessionStorage.getItem('userObject'))
  );

  const videoJsOptions = { // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: src,
      type: 'application/x-mpegURL'
    }]
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on('waiting', () => {
       
      //console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
     
          // update to DB Server
          apiClient.post('/api/movies/statistics', {
            //user_id:  profile.id,
            video_id: props.id,
            timestamp: sessionStorage.getItem('timestamp'),
            duration:sessionStorage.getItem('watchtime')
        });

    });

    player.on('play', () => {
       // console.log('date is ' + Date.now());
     
        sessionStorage.setItem('timestamp', Date.now());
        sessionStorage.setItem('video_id', props.id );
        //console.log('player is playing')
    })

    player.on('loadedmetadata', () => {
       
       // console.log(player.duration()) // video duration
    })

    player.on('timeupdate', () => {
        
        //console.log(player.currentTime());
        //console.log('play is' + sessionStorage.getItem('token'));
       
        // 1. save player.currentTime into session storage
        

        // apiClient.post('/api/movies/statistics', {
        //     user_id:  profile.id,
        //     video_id: props.id,
        //     timestamp: sessionStorage.getItem('timestamp'),
        //     duration: player.currentTime()
        // });

        // dset watchtime to be used in on.dispose

        
        sessionStorage.setItem('watchtime', player.currentTime() );
        
        console.log(player.remainingTime())
    })
  };

  
  // const changePlayerOptions = () => {
  //   // you can update the player through the Video.js player instance
  //   if (!playerRef.current) {
  //     return;
  //   }
  //   // [update player through instance's api]
  //   playerRef.current.src([{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]);
  //   playerRef.current.autoplay(false);
  // };

  return (
    <>
    

      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

     
    </>
  );
}
export default VideoJSPlayer;