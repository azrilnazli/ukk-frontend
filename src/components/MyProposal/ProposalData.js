import React , { useState } from 'react';
import { NavLink } from "react-router-dom";
import { format } from 'date-fns';
import VideoJSPlayer from '../VideoJS';
import RawPlayer from '../VideoJS/RawPlayer';
import {Modal, Button, Form} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import apiClient from '../../services/api';
import ErrorMsg from './ErrorMsg';
import config from '../../config.json'
import GetVideoDetail from './GetVideoDetail';



const ProposalData = ({proposal}) => {

    function NewLineToBr({children = ""}){
        return children.split('\n').reduce(function (arr,line) {
            return arr.concat(
            line,
            <br />
            );
        },[]);
    }
    
    
    function HLSVideoPlayer() {

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    
        return (
          <>
            <Button variant="success" onClick={handleShow}>
              PLAY
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

        <div className="card-body">
        <div className='row p-3'>
            { proposal.theme && 
            <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>theme</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      
                      <NewLineToBr>{proposal.theme}</NewLineToBr>
                      
                    </span>
                  </div>
                </div>
             </div>
             }

            { proposal.genre && 
            <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>genre</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      
                      <NewLineToBr>{proposal.genre}</NewLineToBr>
                      
                    </span>
                  </div>
                </div>
             </div>
             }     

            { proposal.concept && 
            <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>concept</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      
                      <NewLineToBr>{proposal.concept}</NewLineToBr>
                      
                    </span>
                  </div>
                </div>
             </div>
             }                    


            { proposal.synopsis && 
            <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>synopsis</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      
                      <NewLineToBr>{proposal.synopsis}</NewLineToBr>
                      
                    </span>
                  </div>
                </div>
             </div>
             }

            { proposal.published_year && 
             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>Published Year</span>
                  <div className="alert alert-warning " role="alert">
                  
                    <span class="lead text-uppercase">
                      {proposal.published_year}
                    </span>
                  
                  </div>
                </div>
             </div>
              }

            { proposal.casts && 
             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>casts</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      <NewLineToBr>{proposal.casts}</NewLineToBr>
                    </span>
                  </div>
                </div>
             </div>
            }

            { proposal.languages && 
             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>languages</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      <NewLineToBr>{proposal.languages}</NewLineToBr>
                    </span>
                  </div>
                </div>
             </div>
            }

             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>Total Episode</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      {proposal.total_episode}
                    </span>
                  </div>
                </div>
             </div>

             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>duration</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      {proposal.duration}
                    </span>
                  </div>
                </div>
             </div>

             { proposal.country && 
             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>country</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      <NewLineToBr>{proposal.country}</NewLineToBr>
                    </span>
                  </div>
                </div>
             </div>
              }

             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>price per episode</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      MYR&nbsp;{proposal.price_episode}
                    </span>
                  </div>
                </div>
             </div>

             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>price for overall</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      MYR&nbsp;{proposal.price_overall}
                    </span>
                  </div>
                </div>
             </div>

             { proposal.rules && 
             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>Programme Rights</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      <NewLineToBr>{proposal.rules}</NewLineToBr>
                    </span>
                  </div>
                </div>
             </div>
            }

            { proposal.informations && 
             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>Extra Informations</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                      <NewLineToBr>{proposal.informations}</NewLineToBr>
                    </span>
                  </div>
                </div>
             </div>
            }



             {/* <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>PDF</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="lead text-uppercase">
                    { proposal.is_pdf_cert_uploaded != 0 ?
                                <p className="card-text">
                                <h5>PDF</h5>
                                <ShowPDFDocument/>
                                </p>
                                : <span>not uploaded</span> }
                    </span>
                  </div>
                </div>
             </div> */}

             <div className='row'>
                <div className='col'>
                  <span className='badge bg-dark text-uppercase'>Video</span>
                  <div className="alert alert-warning " role="alert">
                    <span class="text-uppercase">
                          { proposal.video ?
                            <>
                                <GetVideoDetail 
                          
                                  video_id={proposal.video.id}
                                />
                            </>
                            :
                            <span>no video being uploaded</span>
                           }
                    </span>
                  </div>
                </div>
             </div>

          </div>
    </div>
    );
};

export default ProposalData;