import React , { useState } from 'react';
import { NavLink } from "react-router-dom";
import { format } from 'date-fns';
import VideoJSPlayer from '../VideoJS';
import {Modal, Button, Form} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import apiClient from '../../services/api';
import ErrorMsg from './ErrorMsg';
import config from '../../config.json'


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
                  Close
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
                      
                        <div className="ms-1 me-1 "><p>PROPOSAL ID : <span className="badge bg-secondary">{tender.id}</span></p></div>
                        <div className="ms-1 me-1 "><p>CHANNEL : <span className="badge bg-secondary">{tender.channel}</span></p></div>
                        <div className="ms-1 me-1 "><p>CATEGORY : <span className="badge bg-secondary">{tender.programme_category}</span></p></div>      
                        <div className="ms-1 me-1 "><p>CODE : <span className="badge bg-secondary">{tender.programme_code}</span></p></div>
                        {/* <div className="ms-1 me-1 "><p>LANGUAGE : {languageList}</p></div> */}
                        <div className="ms-1 me-1 "><p>EPISODES : <span className="badge bg-secondary">{tender.number_of_episode} X {tender.duration}'</span></p></div>
                    </div>                
                </div>

        
                <div className="card-body">
                    <div className='row p-3'>
  
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
                              <span className='badge bg-dark text-uppercase'>Terms & Conditions</span>
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



                         <div className='row'>
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
                         </div>

                         <div className='row'>
                            <div className='col'>
                              <span className='badge bg-dark text-uppercase'>Video</span>
                              <div className="alert alert-warning " role="alert">
                                <span class="lead text-uppercase">
                                      { proposal.video ?
                                  
                                            <ShowVideoPlayer/>
                                           
                                            : <span>not uploaded</span> }
                                </span>
                              </div>
                            </div>
                         </div>

                      </div>
                    
                </div>
                <div className="card-footer"> 
                <div>
                  <div className="d-flex flex-row">
                      {/* <div className=""><EditProposal /></div>        */}
                      <div className="ms-2"><DeleteProposal /></div>     
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