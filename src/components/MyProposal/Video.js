import React , { useState, useEffect }  from 'react';
import apiClient from '../../services/api';
import Progress from './Progress';
import Conversion from './Conversion';
import VideoJSPlayer from '../VideoJS';
import {Modal, Button, Form} from 'react-bootstrap';
const collect = require('collect.js'); 


const Video = ({proposal_id,tender_id}) => {

    const [file,setFile] = useState('');
    const [filename,setFilename] = useState('Choose file');
    const [uploaded, setUploaded] = useState(false);
    const [errors, setErrors] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [conversionPercentage, setConversionPercentage] = useState(0);
    const [videoId, setVideoId] = useState('');
    const [systemMsg, setSystemMsg] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [isVideoPlayable, setIsVideoPlayable] = useState(false)

    const handleChange = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const getCurrentVideo = () => {

        // get current video id
        apiClient.get(`/api/proposal/${proposal_id}/get_video`) // axios call to txt file
        .then((response) => {
            console.log(response)  
            if(response.data.exists === true){
                console.log('showing video with id ' + response.data.video_id)
                setVideoId(response.data.video_id)
                setShowVideo(true)

                if(response.data.video_id){
                    // check existing conversion status
                    console.log('video is is ' + response.data.video_id)
                    apiClient.get(`/api/video/${response.data.video_id}/conversion_progress`)
                    .then((response) => {
                        console.log(response)  
                        if(response.data.converting === true){ // is converting
                            setIsDisabled(true)
                            setShowVideo(false)
                            setUploaded(true); // setter 
                            console.log('checked : is converting')
                        }          
                    })
                    .catch((e) => {
                        console.log(e.error);
                        console.log("Error");
                        setConversionPercentage(0); // set counter to zero
                    });
                } // check videoID

                // check is video playable
                if(response.data.video_id){
                    // check existing conversion status
                    console.log('check video playable ' + response.data.video_id)
                    apiClient.get(`/api/video/${response.data.video_id}/is_playable`)
                    .then((response) => {
                        console.log(response)  
                        if(response.data.is_playable === true){ // is converting
                            console.log('is playable : yes')
                            setIsVideoPlayable(true)
                        }          
                    })
                    .catch((e) => {
                        console.log(e.error);
                        console.log("Error");
                        setConversionPercentage(0); // set counter to zero
                    });
                } // check videoID

            }          
        })
        .catch((e) => {
            console.log(e.error);
            console.log("Error");
            setConversionPercentage(0); // set counter to zero
        });

       
    }
    React.useEffect(() => getCurrentVideo(), []); 

    const getVideoProgress = () => {
        
        if(videoId !== '') { //if videoId is present and conversionPercentage below 100%
            
            let timer = setInterval(() => { // timer is setInterval() id , need to clear if conversionPercentage == 100
                apiClient.get(`/api/video/${videoId}/conversion_progress`) // axios call to txt file
                .then((response) => {
                    console.log(response.data)
                    //setIsDisabled(true)

                    //if (response.data.progress != 0 || response.data.progress < 101){
                        
                        if(response.data.converting == true){
                            setIsDisabled(true)
                            setShowVideo(false)
                            setConversionPercentage(response.data.progress); // setter 
                            console.log('is converting')
                        } else {
                            console.log('done converting')
                            setSystemMsg('Your video was proccessed.')
                            setShowVideo(true)
                            setIsVideoPlayable(true)
                            setIsDisabled(false)
                            setConversionPercentage(0);
                            setUploaded(false)
                            clearInterval(timer)
                        }

                       // setIsDisabled(true)
                   // }
                    
                    // if(response.data.progress == 100){
                    //     console.log('done converting')
                    //     console.log('set show video')
                    //     setShowVideo(true)
                    //     setIsDisabled(false)
                    //     setSystemMsg('Your video was proccessed.')
                    //     setConversionPercentage(0);
                    //     clearInterval(timer)
                    // }

          
                })
                .catch((e) => {
                    console.log("Error");
                    setConversionPercentage(0); // set counter to zero
                });
            }, 1000);

      
        }
    }

  // React.useEffect(() => getVideoProgress(), [videoId]); // only run useEffect when videoId is changed
   React.useEffect(() => getVideoProgress(), [uploaded]); // only run useEffect when videoId is changed

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDisabled(true)
        setErrors('')
        const formData = new FormData(); // JavaScript
        formData.append('proposal_id', proposal_id) // selected file
        formData.append('tender_id', tender_id) // selected file
        formData.append('file', file) // selected file

        setSystemMsg('Your video is being uploaded')
        // axios 
        apiClient({
            method: "post",
            url: "/api/proposal/upload_video",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: progressEvent => {
               setUploadPercentage(
                   parseInt(
                            Math.round(
                                        (progressEvent.loaded * 100 ) / (progressEvent.total)
                                    )
                            )
                    );
                
                    // clear percentage
                setTimeout( () => setUploadPercentage(0), 10000 );
            }

            
        }).then(response => {
            setSystemMsg('Your video was uploaded successfully. Now sent for encoding. Please wait...')
            console.log(response.data.uploaded)
            setUploaded(true)
            setVideoId(response.data.video_id)
            setIsDisabled(false)

      
        }).catch(error => {
            if (error.response.status === 500) {
                console.log('Error 500'); 
                setErrors('Server Error : 500');
            }
            if (error.response.status === 422) {
                console.log(error.response)
                setErrors(error.response.data.errors.file[0]);
            }
        })
    }

    function ShowVideoPlayer() {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    
        return (
          <>
            <Button variant="primary" onClick={handleShow}>
              Play Video
            </Button>
      
            <Modal show={show} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>VIDEO PLAYER</Modal.Title>
              </Modal.Header>
              <Modal.Body>
    
              <VideoJSPlayer id={videoId} />
          
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
         
              </Modal.Footer>
            </Modal>
          </>
        );
      }


    return (
        <>
    
        



            <form onSubmit={handleSubmit}>
               
                <div className='row' >

                        <div className='col-4'>
                            { isVideoPlayable ? 
                            <div className="alert alert-secondary" role="alert">
                                <div className='row' >
                                    <div className='col text-center'><ShowVideoPlayer/></div>
                                    <div className='col ml-2'> 
                                    <p>You've successfully attached a video to this proposal.</p></div>
                                </div>
                            </div>     
                            :
                            <div className="alert alert-secondary" role="alert">
                                <p>Please compress the video before uploading. Accepted codecs are H264/MP3 with .mov and .mp4 container.</p>
                            </div>
                            }
                        </div>
                        <div className='col-8'>
                            <div className='row'>

                                <div className='col-10'>
                                    <div className="input-group mb-3">

                                        { !isDisabled ? 
                                            <input 
                                            type="file"
                                            required
                                            accept="video/mp4,video/x-m4v,video/*"
                                            className={"form-control" + (errors ? ' is-invalid' : uploaded ? ' is-valid' : '' )}
                                            onChange={handleChange} 
                                            />
                                        :
                                            <input 
                                            type="file"
                                            disabled
                                            accept="video/mp4,video/x-m4v,video/*"
                                            className={"form-control" + (errors ? ' is-invalid' : uploaded ? ' is-valid' : '' )}
                                            onChange={handleChange} 
                                            />
                                        }

                                        <>
                                        { errors ? 
                                            <div className="invalid-feedback">
                                                {errors}
                                            </div> 
                                        :
                                            <>
                                            { uploaded ? 
                                                <div  className="valid-feedback">
                                                {systemMsg}.
                                                </div> 
                                            :
                                                null 
                                            }
                                            </> 
                                        }
                                        </>
                                    </div>
                                    <p>Max Video size is 2GB and please convert you video to MOV or MP4 with H264 Video Codec</p>
                                    { uploadPercentage ? 
                                    <Progress percentage={uploadPercentage} />
                                    :
                                    null 
                                    }

                                    { conversionPercentage ? 
                                    <Conversion percentage={conversionPercentage} />
                                    :
                                    null 
                                    }
                                </div>

                                
                                <div className='col-2'>
                                        { isDisabled ? 
                                        <button disabled type="submit" className="btn btn-primary btn-block mt-1">Upload</button>
                                        :
                                        <button type="submit" className="btn btn-primary btn-block mt-1">Upload</button>
                                        }
                                </div>
                            </div>
                                
                        </div>

             
                    </div>
                    <div className="col-12 mb-3">
                   
                    </div>
              

            </form>
     

</>

        
    );
};

export default Video;