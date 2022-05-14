import React , { useState, useEffect }  from 'react';
import apiClient from '../../services/api';
import Progress from './Progress';
import Conversion from './Conversion';
import VideoJSPlayer from '../VideoJS';
const collect = require('collect.js'); 


const Video = () => {

    const [file,setFile] = useState('');
    const [filename,setFilename] = useState('Choose file');
    const [uploaded, setUploaded] = useState('');
    const [errors, setErrors] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [conversionPercentage, setConversionPercentage] = useState(0);
    const [videoId, setVideoId] = useState('');
    const [systemMsg, setSystemMsg] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [isNewVideo, setIsNewVideo] = useState(false)

    const handleChange = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const getCurrentVideo = () => {
        apiClient.get('/api/proposal/get_video') // axios call to txt file
        .then((response) => {
            console.log(response.data)  
            if(response.data.exists === true){
                console.log('showing video with id ' + response.data.video_id)
                setVideoId(response.data.video_id)
                setShowVideo(true)
               
            }          
        })
        .catch((e) => {
            console.log(e.error);
            console.log("Error");
            setConversionPercentage(0); // set counter to zero
        });
    }
    React.useEffect(() => getCurrentVideo(), [isNewVideo]); 

    const getVideoProgress = () => {
        
        if(videoId != '' && conversionPercentage < 100 ) { //if videoId is present and conversionPercentage below 100%
            
            let timer = setInterval(() => { // timer is setInterval() id , need to clear if conversionPercentage == 100
                apiClient.get(`/api/video/${videoId}/conversion_progress`) // axios call to txt file
                .then((response) => {
                
                    setIsDisabled(true)
                    if (response.data.progress != 0 || response.data.progress < 101){
                        setConversionPercentage(response.data.progress); // setter 
                        setIsDisabled(true)
                        if(response.data.progress > 97 && response.data.progress < 100){
                            setIsDisabled(false)
                    
                            
                            console.log('set show video')
                            setShowVideo(true)
                            setSystemMsg('Your video was proccessed.')
                          
                        }
                    } else {
                        
                        clearInterval(timer); // cleaning machine  
                        
                    }             
                })
                .catch((e) => {
                    console.log("Error");
                    setConversionPercentage(0); // set counter to zero
                });
            }, 1000);
        }
    }

   React.useEffect(() => getVideoProgress(), [uploaded]); // only run useEffect when videoId is changed
 
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDisabled(true)
        setErrors('')
        const formData = new FormData(); // JavaScript
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
            setSystemMsg('Your video was uploaded successfully')
            console.log(response.data.uploaded)
            setUploaded(response.data.uploaded)
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

 

  

    return (
        <>
        <div className='container container-fluid bg-light rounded p-3 col-md-12'>
     
            { showVideo ? 
                <div className="alert alert-secondary" role="alert">
                   <h4 className="alert-heading">Video</h4>
                   <VideoJSPlayer id={videoId} />
               </div>     
            :
            <div className="alert alert-secondary" role="alert">
                <h4 className="alert-heading">Video</h4>
                <p>Please compress the video before uploading. Accepted codecs are H264/MP3 with .mov and .mp4 container.</p>
            </div>
            }
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input 
                    type="file"
                    required
                    accept="video/mp4,video/x-m4v,video/*"
                    className={"form-control" + (errors ? ' is-invalid' : uploaded ? ' is-valid' : '' )}
                    onChange={handleChange} 
                    />
                    
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
                <div className="col-12 mb-3">
                { uploadPercentage ? 
                <Progress percentage={uploadPercentage} />
               
                :
                null 
                }

                { conversionPercentage != 100 && conversionPercentage != 0 ? 
                <Conversion percentage={conversionPercentage} />
                :
                null
                }
                </div>
                { isDisabled ? 
                    <button disabled type="submit" className="btn btn-primary btn-block mt-1">Upload</button>
                :
                    <button type="submit" className="btn btn-primary btn-block mt-1">Upload</button>
                }
            </form>
        </div>


</>

        
    );
};

export default Video;