import React from 'react';
import ReactDOM from 'react-dom';
//import ReactPlayer from 'react-hls-player';
import ReactHlsPlayer from 'react-hls-player';




const ReactHLSPlayer = (props) => {

    console.log('id is ' + props.id)
    //const src = `http://admin.test/api/movie/${props.id}/play` // test url

    const token = sessionStorage.getItem('token');
    const src = `http://admin.test/api/movie/${props.id}/playlist.m3u8/${token}?access_token=${token}`
    //const src = `http://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8` //test header
    
    const playerRef = React.useRef();

    React.useEffect(() => {
      function fireOnVideoStart() {
        // Do some stuff when the video starts/resumes playing
        console.log('play')
      }
  
      playerRef.current.addEventListener('play', fireOnVideoStart);
  
      return playerRef.current.removeEventListener('play', fireOnVideoStart);
    }, []);
    
    return (
        <div className='container container-fluid bg-light rounded p-3'>
            <ReactHlsPlayer
                playerRef={playerRef}
                // hlsConfig = {{
                //     licenseXhrSetup: function (xhr, src) {
                //     xhr.withCredentials = true; // do send cookies
                //     if (!xhr.readyState) {
                //         // Call open to change the method (default is POST) or modify the url
                //        // xhr.open('GET', src, true);
                //         // Append headers after opening
                //         //xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                //         xhr.setRequestHeader('Authorization',`Bearer ${token}`)
                //     }
                //     },
                // }}
                src={src}
                autoPlay={true}
                controls={true}
                width="100%"
                height="auto"
            />

            
        </div>
    );
};

export default ReactHLSPlayer;
