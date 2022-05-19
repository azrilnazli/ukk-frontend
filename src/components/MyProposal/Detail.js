import React , { useState } from 'react';
import { NavLink } from "react-router-dom";
import { format } from 'date-fns';
import VideoJSPlayer from '../VideoJS';
import {Modal, Button, Form} from 'react-bootstrap';
import config from '../../config.json'


const Detail = ({proposal,tender,created_at}) => {

    const date = format(new Date(created_at), 'yyyy/MM/dd kk:mm:ss')
    const languageList =tender.languages.map((language) => 
        <span className="badge bg-secondary">{language}</span>
    );

    function NewLineToBr({children = ""}){
        return children.split('\n').reduce(function (arr,line) {
            return arr.concat(
            line,
            <br />
            );
        },[]);
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
    
              <VideoJSPlayer id={proposal.video_id} />
          
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
              Show PDF
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

    return (
            <div key={tender.id} className="card mt-3">
                <div className="card-header">
                    <div className="d-lg-flex flex-row justify-content-center mt-2">
                        <div className="ms-1 me-1 "><p>TENDER ID : <span className="badge bg-secondary">{tender.id}</span></p></div>
                        <div className="ms-1 me-1 "><p>CHANNEL : <span className="badge bg-secondary">{tender.channel}</span></p></div>
                        <div className="ms-1 me-1 "><p>CATEGORY : <span className="badge bg-secondary">{tender.tender_category}</span></p></div>      
                        <div className="ms-1 me-1 "><p>CODE : <span className="badge bg-secondary">{tender.programme_code}</span></p></div>
                        <div className="ms-1 me-1 "><p>LANGUAGE : {languageList}</p></div>
                        <div className="ms-1 me-1 "><p>EPISODES : <span className="badge bg-secondary">{tender.number_of_episode} X {tender.duration}'</span></p></div>
                    </div>                
                </div>

        
                <div className="card-body">
                    <div className='row p-3'>
  
                        <div className='col-lg-6'>
                            <div className="alert alert-secondary d-flex align-items-center" role="alert">
                                <NewLineToBr>{tender.description}</NewLineToBr>
                            </div>
                         </div>
                         <div className='col-lg-6 '>
                         
                            <p className="card-text">
                            <h5>Your Proposal ID</h5>
                            <h5><span className="badge bg-warning text-dark">{proposal.id}</span></h5>
                            </p>

                            <p className="card-text">
                            <h5>Theme</h5>
                            {proposal.theme}
                            </p>

                            <p className="card-text">
                            <h5>Genre</h5>
                            {proposal.genre}
                            </p>

                            <p className="card-text">
                            <h5>Concept</h5>
                            {proposal.concept}
                            </p>

                            <p className="card-text">
                            <h5>Synopsis</h5>
                            {proposal.synopsis}
                            </p>

                            <div className='row'>
                                <div className='col-lg-6'>

                                            { proposal.video_id != 0 ?
                                            <p className="card-text">
                                            <h5>Video</h5>
                                            <ShowVideoPlayer/>
                                            </p>
                                            : null }
                                </div>
                                <div className='col-lg-6'>

                                            { proposal.is_pdf_cert_uploaded != 0 ?
                                            <p className="card-text">
                                            <h5>PDF</h5>
                                            <ShowPDFDocument/>
                                            </p>
                                            : null }

                                </div>
                            </div>

                      

                  
                        </div>
                    </div>
                    
                </div>
                <div className="card-footer text-center">          
               Applied on {date}
                </div>
            </div>
    );
};

export default Detail;