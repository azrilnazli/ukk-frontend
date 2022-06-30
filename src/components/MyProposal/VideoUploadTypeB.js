import React , { useState, useEffect }  from 'react';
import apiClient from '../../services/api';
import Progress from './Progress';
import Conversion from './Conversion';
import VideoJSPlayer from '../VideoJS';
import {Modal, Button, Form} from 'react-bootstrap';
const collect = require('collect.js'); 



const VideoUploadTypeB = ({proposal_id,tender_id}) => {

    // console.log('********************************')is_ready
    // console.log('welcome to Video Check System ')
    // console.log('********************************')

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

    const [isVideoPlayable, setIsVideoPlayable] = useState(false) // based on is_ready

    const handleChange = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const getCurrentVideo = () => {

        console.log('.............................')
        console.log('Initiate Get Current Video Check')
        console.log('.............................')
        // get current video id
        console.log('check : get_video from server')
        apiClient.get(`/api/proposal/${proposal_id}/get_video`) // axios call to txt file
        .then((response) => {
            //console.log(response) 
            console.log('check : video_id exists is TRUE ?')
            if(response.data.exists === true){
                console.log('result : video_id exists with id ' + response.data.video_id)
                setVideoId(response.data.video_id)
                setShowVideo(true)

                console.log('check : video_id not null ?')
                if(response.data.video_id !== 0){
                    // check existing conversion status
                    //console.log('video is is ' + response.data.video_id)
                    console.log('result : video_id not null with id ' + response.data.video_id)
                    console.log('check : video_id is processing ?')
                    apiClient.get(`/api/video/${response.data.video_id}/conversion_progress`)
                    .then((response) => {
                        console.log('is processing ? got response...')  
                        if(response.data.converting === true){ // is converting
                          
                            setShowVideo(false)
                            setIsVideoPlayable(false)
                            setIsDisabled(true)
                            console.log('result : is_processing is true')

                        }else{
                            console.log('result : is_processing is false')
                        }          
                    })
                    .catch((e) => {
                      
                        console.log(e.error);
                        console.log("Error : processing check");
                        setConversionPercentage(0); // set counter to zero
                    });
                }else {
                    console.log('video_id is null')
                }// check videoID

                // check is video playable
                console.log('check : if video is_playable ?')
                if(response.data.video_id != 0){
                    // check existing conversion status
                    console.log('result : got response ... video_id is :' + response.data.video_id)
                    apiClient.get(`/api/video/${response.data.video_id}/is_playable`)
                    .then((response) => {
                         
                        if(response.data.is_playable == true){ // is playable
                            console.log('result : is playable : yes')
                            setIsVideoPlayable(true)
                        } else {
                            console.log('result : is playable : no')
                        }      
                    })
                    .catch((e) => {
                        console.log(e.error);
                        console.log("Error : playable check");
                        setConversionPercentage(0); // set counter to zero
                    });
                } // check videoID

            } else {
                console.log('result : user has no video')
            }         
        })
        .catch((e) => {
            console.log(e.error);
            console.log("Error");
            setConversionPercentage(0); // set counter to zero
        });

       
    }
    React.useEffect(() => getCurrentVideo(), []); // check if video was uploaded

    const getVideoProgress = () => {
        console.log('.............................')
        console.log('Initiate Video Progress Check')
        console.log('.............................')
        console.log('check : if videoId was set ?')
        if(videoId !== '') { //if videoId is present 
            
            console.log('result : videoId is set :' + videoId)
    
            let timer = setInterval(() => { // timer is setInterval() id , need to clear if conversionPercentage == 100
                console.log('check : get conversion_process')
               
                apiClient.get(`/api/video/${videoId}/conversion_progress`) // axios call to txt file
                .then((response) => {
                
                    console.log('result :  conversion_process exist')
                    console.log('check : if converting is true ?' + response.data.converting )

                        if(response.data.converting === true){
                            console.log('result : is converting = ' + response.data.progress + '%')
                       
                            setConversionPercentage(response.data.progress); // setter 
                        
                        } else {
                            console.log('result : not converting')
                            setSystemMsg('Your video was successfully uploaded and processed.')
                            setIsDisabled(false)
                            setIsVideoPlayable(true)
                           
                            setConversionPercentage(0);
                            clearInterval(timer)
                        }
          
                })
                .catch((e) => {
                    console.log("Error : conversion_progress");
                   
                    setConversionPercentage(0); // set counter to zero
                    clearInterval(timer)
                });
            }, 2000); // update evey 1 sec

  
        } else {
            console.log('result : videoId is not being set')
        }
    }
    
    React.useEffect(() => getVideoProgress(), [uploaded,videoId]); // only run useEffect when videoId is changed

    const handleSubmit = (e) => {
        console.log('.............................')
        console.log('Initiate Video Upload Check')
        console.log('.............................')
        e.preventDefault();
        
        setErrors('')
        setIsDisabled(true) // enabled if error
        
        
        /**
         * MySQL date
         * @param {Date} [date] Optional date object
         * @returns {string}
         */
        function mysqlDate(date = new Date()) {
            return date.toISOString().split('T')[0];
        }
        
        const date = mysqlDate();

        const datetime = new Date().toJSON().slice(0, 19).replace('T', ' ')

        
        const formData = new FormData(); // JavaScript

        
        formData.append('proposal_id', proposal_id) // selected file
        formData.append('tender_id', tender_id) // selected file
        formData.append('start_time', datetime)
        formData.append('file', file) // selected file

        setSystemMsg('Your video is being uploaded')
        console.log('check : user begin to upload video')
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
                //setUploadPercentage(0)
                // clear percentage
                //setTimeout( () => setUploadPercentage(0), 10000 );
            }

            
        }).then(response => {
            console.log('result : video uploaded successfully')
            setUploadPercentage(0)
            setSystemMsg('Your video was uploaded successfully. Now sent for cloud encoding queue.')
            
            console.log(response.data)
    
            setVideoId(response.data.video_id)
            setUploaded(true)
      
        }).catch(error => {
            if (error.response.status === 500) {
                console.log('Error 500 : upload video'); 
                setErrors('Server Error : 500');
            }
            if (error.response.status === 422) {
                console.log('Error : upload video validation error');
                setErrors(error.response.data.errors.file[0]);
            }
            setIsDisabled(false) // enabled if error
            
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

                        <div className='col-lg-4'>
                  
                            <div className="alert alert-secondary text-center" role="alert">
                                <span>Suggested Codec is H264/AAC  with these container ( MOV,MP4,MPEG-2 )</span>
                            </div>
                            
                        </div>
                        <div className='col-lg-8'>
                            <div className='row'>

                                <div className='col-lg-10'>
               
                                    <div className="input-group mb-3">

                                        { isDisabled ? 
                                            <input 
                                                type="file"
                                                disabled
                                                accept="video/mp4,video/x-m4v,video/*"
                                                className={"form-control" + (errors ? ' is-invalid' : uploaded ? ' is-valid' : '' )}
                                                onChange={handleChange} 
                                            />
                                        :
                                            
                                            <input 
                                                type="file"
                                                required
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
                                    {/* <pre>
                                    Pihak pembekal disarankan untuk 'compress' video anda 
                                    ke format MP4,MOV atau MPG ( H264 / AAC ) 
                                    dengan resolusi 720p (5Mbps bitrate) atau rendah. 
                                    Dengan saiz kandungan tidak melebihi 3GB
                                    </pre>    */}
                                    
                                    <p>Untuk memastikan video lancar untuk dimuatnaik, pihak pembekal disarankan untuk 'compress'
                                        video anda ke format MP4,MOV atau MPG ( H264 / AAC ) dengan resolusi 720p (3Mbps bitrate).
                                        Boleh gunakan perisian <strong>Handbrake</strong> untuk encode video anda sebelum upload. 
                                        ( <a target="_blank" href="https://handbrake.fr">https://handbrake.fr</a> )
                                    </p>

                                    { uploadPercentage ? 
                                    <Progress percentage={uploadPercentage} />
                                    :
                                    null 
                                    }

                                    {/* { conversionPercentage ? 
                                    <Conversion percentage={conversionPercentage} />
                                    :
                                    null 
                                    } */}

                                </div>

                                
                                <div className='col-lg-2'>
                                        { isDisabled ? 
                                        <button disabled type="submit" className="btn btn-primary btn-block mt-1">Upload</button>
                                        :
                                        <button type="submit" className="btn btn-primary btn-block mt-1">Upload</button>
                                        }
                                </div>
                            </div>
                                
                        </div>

             
                    </div>
  

            </form>
     

</>

        
    );
};

export default VideoUploadTypeB;