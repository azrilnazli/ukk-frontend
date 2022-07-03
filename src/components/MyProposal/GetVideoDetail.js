import React , { useState }  from 'react';

import apiClient from '../../services/api';
import ErrorMsg from './ErrorMsg';
import RawPlayer from '../VideoJS/RawPlayer';
import {Modal, Button, Form} from 'react-bootstrap';

const GetVideoDetail = ({video_id}) => {

    const [isPending, setIsPending] = useState(false)
    const [error,setError] = React.useState('')
    const [title,setTitle] = React.useState('')
    const [video, setVideo] = useState([])

    //const [total, setTotal] = useState([])


    const getProposal = () => {
        setIsPending(true)
        console.log('.............................')
        console.log('Initiate Get Video Metadata from Server')
        console.log('.............................')
        // get current video id
        apiClient.get('/api/videos/' + video_id + '/metadata') // axios call to server
        .then((response) => {
            setIsPending(false)
            console.log('result: got response... fetching data')     
            console.log(response.data)
            setVideo(response.data.video) // video returned from server
        })
        .catch((error) => {
            setIsPending(false)
            console.error(error)
            if (error.response.status === 422) {
                setTitle(error.response.data.title); 
                setError(error.response.data.message);
               
            } else {
                setTitle('Restricted area'); 
                setError('You don\'t have permission to enter this area.');
            }
        });
    }
    React.useEffect(() => getProposal(), []); // GET request to server

    
    function ShowVideoPlayer() {

        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    
        return (
          <>
            <Button variant="primary" onClick={handleShow}>
              Play RAW Video
            </Button>
      
            <Modal show={show} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>VIDEO PLAYER</Modal.Title>
              </Modal.Header>
              <Modal.Body>
    
           <RawPlayer id='21' />
          
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
        ( isPending ? 'loading...' :
            <div>
                <pre>Video ID : {video_id}</pre>
                <pre>Uploaded on : {video.date}</pre>
                <pre>Original name : {video.original_filename}</pre>
                <pre>Original codec : {video.format}</pre>
                <pre>Original size : {video.uploaded_size}</pre>
                <pre>Video Length : {video.length}</pre>
                <pre>Encoding status :&nbsp;
                  { video.is_reencode ? 
                      'encoding was failed ( suggestion : Please re-encode the video to H264/AAC using HandBrake with lower bitrates ( 360p ) and reupload )' 
                    : 
                      <>
                      { video.is_ready ?
                          'encoding was successful'
                        : 
                          'still processing'
                      } 
                      </>
                  }
                </pre> 
            </div>
        )
    );
};

export default GetVideoDetail;