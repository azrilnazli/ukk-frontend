import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';




const VideoReactPlayer = (props) => {

    console.log('id is ' + props.id)
    //const src = `http://admin.test/api/movie/${props.id}/play` // test url

    const token = sessionStorage.getItem('token');
    const src = `http://admin.test/api/movie/${props.id}/playlist.m3u8/${token}?access_token=${token}`
    //const src = `http://admin.test/api/movie/${props.id}/play` //test header
    const [played, setPlayed] = React.useState(0);

    console.log(played)

    
    return (
        <div className='container container-fluid bg-light rounded p-3'>
            <ReactPlayer

                onProgress={(progress) => {
                    setPlayed(progress.playedSeconds);
                  }}
                url={src}
                playing={true}
                controls={true}
                width="100%"
                height="auto"
            />

            
        </div>
    );
};

export default VideoReactPlayer;
