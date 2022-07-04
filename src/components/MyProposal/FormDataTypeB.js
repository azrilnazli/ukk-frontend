import React , { useState } from 'react';
import { NavLink } from "react-router-dom";
import { format } from 'date-fns';
import {Modal, Button, Form} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import apiClient from '../../services/api';
import ErrorMsg from './ErrorMsg';
import config from '../../config.json'
import VideoJSPlayer from '../VideoJS';
import ProposalData from './ProposalData';


const Detail = ({setDestroyed,proposal,tender,created_at}) => {

  const [isPending,setIsPending] = useState(false)
  const [error,setError] = React.useState('')
  const [title,setTitle] = React.useState('')
  


    const date = format(new Date(created_at), 'yyyy/MM/dd kk:mm:ss')
    // const languageList =tender.languages.map((language) => 
    //     <span className="badge bg-secondary">{language}</span>
    // );

    const [edit,setEdit] = React.useState(false)
    const [destroy,setDestroy] = React.useState(false)

    function ShowProposalData() {

      const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const [fullscreen, setFullscreen] = React.useState(true);
  
      return (
        <>
          <Button variant="primary" onClick={handleShow}>
            SHOW PROPOSAL
          </Button>
    
          <Modal fullscreen={fullscreen}  show={show} size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>PROPOSAL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
  
            <ProposalData proposal={proposal} />
                      
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

    function ShowPDFDocument() {
      const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const [fullscreen, setFullscreen] = React.useState(true);
  
      return (
        <>
          <Button variant="primary" onClick={handleShow}>
            SHOW PDF
          </Button>
    
          <Modal fullscreen={fullscreen}  show={show} size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>PDF VIEWER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
  
            <embed
              src={ config.SERVER_URL + "/storage/proposals/" + proposal.id + "/proposal.pdf"}
              type="application/pdf"
              frameBorder="0"
              scrolling="auto"
              height="100%"
              width="100%"
            ></embed>
        
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

    function HLSVideoPlayer() {

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
  
      return (
        <>
          <Button variant="primary" onClick={handleShow}>
            SHOW VIDEO
          </Button>
    
          <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>VIDEO PLAYER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
  
            <VideoJSPlayer id={proposal.video.id} />
        
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

    function RAWVideoPlayer() {

      const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const src = config.VIDEO_URL + `/${proposal.video.id}/original.mp4`
  
      return (
        <>
          <Button variant="primary" onClick={handleShow}>
            SHOW VIDEO
          </Button>
    
          <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>VIDEO PLAYER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
  
            
              <video width="750" height="500" controls >
                  <source src={src} type="video/mp4"/>
              </video>
                      
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

    function EditProposal(){

      return(
        <Button variant="warning" onClick={handleEdit}>
        EDIT
        </Button>
      )
    }

    function DeleteProposal() {
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      function handleDestroy(){
          setShow(false)
          console.log('delete')
          
          
          // start request delete
          setIsPending(true)
          console.log('.............................')
          console.log('Initiate Deleting data from Server')
          console.log('.............................')
          // get current video id
          console.log('check : get proposal_id from server')

          const formData = new FormData(); // JavaScript
          formData.append('proposal_id', proposal.id) // selected file

          apiClient({
              method: "post",
              url: "/api/proposal/destroy",
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },               
          })
          .then((response) => {
              setIsPending(false)
              console.log('result: got reponse... fetching data')     
              console.log(response.data)
              setDestroy(true)
          })
          .catch((error) => {
              setIsPending(false)
              console.error(error.response.data)
              if (error.response.status === 422) {
                  setTitle(error.response.data.title); 
                  setError(error.response.data.message);
                
              } else {
                  setTitle('Restricted area'); 
                  setError('You don\'t have permission to enter this area.');
              }
          });
        // end request delete

      } // handleDestroy

  
      return (
        <>
          <Button variant="danger" onClick={handleShow}>
            DELETE
          </Button>
    
          <Modal  show={show} size="md" onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>DELETE PROPOSAL ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
  
            Are you sure ?
        
            </Modal.Body>
            <Modal.Footer>

            <Button variant="danger" onClick={handleDestroy}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
        
            </Modal.Footer>
          </Modal>
        </>
      );
    }

    function handleEdit(){
      console.log('edit')
      setEdit(true)
    }

    if (destroy === true) {
      //return <Redirect to={'/success'} />
      setDestroyed(true)
    }

    if (edit === true) {
      return <Redirect to={'/tender/' + tender.id + '/apply'} />
    }

    return (

      <>
      { error ? <ErrorMsg title={title} message={error} /> :
      
    
            <div key={tender.id} className="card mt-3">
                <div className="card-header">
                <div className="d-lg-flex flex-row justify-content-start mt-2">
                <h2><span className='text-uppercase'>{tender.tender_detail.title}</span></h2>
                </div>
                    <div className="d-lg-flex flex-row justify-content-start mt-2">
                      
                        <div className="ms-1 me-1 "><p>PROPOSAL ID : <span className="badge bg-secondary">{proposal.id}</span></p></div>
                        <div className="ms-1 me-1 "><p>TENDER ID : <span className="badge bg-secondary">{tender.id}</span></p></div>
                        <div className="ms-1 me-1 "><p>CHANNEL : <span className="badge bg-secondary">{tender.channel}</span></p></div>
                        <div className="ms-1 me-1 "><p>CATEGORY : <span className="badge bg-secondary">{tender.programme_category}</span></p></div>      
                        <div className="ms-1 me-1 "><p>CODE : <span className="badge bg-secondary">{tender.programme_code}</span></p></div>
                        {/* <div className="ms-1 me-1 "><p>LANGUAGE : {languageList}</p></div> */}
                        <div className="ms-1 me-1 "><p>EPISODES : <span className="badge bg-secondary">{tender.number_of_episode} X {tender.duration}'</span></p></div>
                    </div>                
                </div>

                <div className="card-footer"> 
                <div>
                  <div className="d-flex flex-row">
                      {/* <div className=""><EditProposal /></div>        */}
                     
                      
                        <>
                        <div className="ms-2"><ShowProposalData /></div>
                        { proposal.is_pdf_cert_uploaded != 0 &&
                              <div className="ms-2"><ShowPDFDocument/></div>
                        }

                        { proposal.video &&
                          <div className="ms-2">
                          { proposal.video.is_ready ?
                            <HLSVideoPlayer />
                            :
                            <RAWVideoPlayer />
                          }
                          </div>

                        }
                         <div className="ms-2"><NavLink  to={`/tender/${tender.id}/${proposal.id}/edit`} className="btn btn-success">EDIT</NavLink></div>
                       
                        { (tender.tender_detail.id === 3 || tender.tender_detail.id === 4 ) &&
                        <div className="ms-2"><DeleteProposal /></div>     
                        }
                        </>
                   
                      
                      
                      <div className="ms-auto align-self-center">Applied on <strong>{date}</strong></div>               
                  </div>
                </div>                     
                </div>
            </div>

            }
            </>
    );
};

export default Detail;