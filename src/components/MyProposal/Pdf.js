import React , { useState, useEffect }  from 'react';
import apiClient from '../../services/api';
import Progress from './Progress';
import {Modal, Button, Form} from 'react-bootstrap';
import config from '../../config.json'
const collect = require('collect.js'); 


const Pdf = ({proposal_id,tender_id}) => {

    const [file,setFile] = useState('');
    const [filename,setFilename] = useState('Choose file');
    const [uploaded, setUploaded] = useState(false);
    const [errors, setErrors] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const [systemMsg, setSystemMsg] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [showPdf, setShowPdf] = useState(false);


    const handleChange = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const getCurrentPdf = () => {

        // get current video id
        apiClient.get(`/api/proposal/${proposal_id}/get_pdf`) // to check if PDF exist for this TenderSubmissionID/proposal_id
        .then((response) => {
            console.log('checking pdf')
            console.log(response)  
            if(response.data.exists === true){
                console.log('showing pdf')
                setShowPdf(true)
            }          
        })
        .catch((e) => {
            console.log(e.error);
            console.log("Error");
        });

       
    }
    React.useEffect(() => getCurrentPdf(), []); 


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDisabled(true)
        setErrors('')
        const formData = new FormData(); // JavaScript
        formData.append('proposal_id', proposal_id) // selected file
        formData.append('tender_id', tender_id) // selected file
        formData.append('file', file) // selected file

        setSystemMsg('Your PDF is being uploaded')
        // axios 
        apiClient({
            method: "post",
            url: "/api/proposal/upload_pdf",
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
                //setTimeout( () => setUploadPercentage(0), 10000 );
            }

            
        }).then(response => {
            setUploadPercentage(0)
            setSystemMsg('Your PDF was uploaded successfully.')
            console.log(response.data.uploaded)
            setUploaded(true)
            setIsDisabled(false)
            console.log('showing pdf')
            setShowPdf(true)

      
        }).catch(error => {
            if (error.response.status === 500) {
                console.log('Error 500'); 
                setErrors('Server Error : 500');
            }
            if (error.response.status === 422) {
                console.log(error.response)
                setErrors(error.response.data.errors.file[0]);
            }

            setIsDisabled(false)
        })
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
                src={ config.SERVER_URL + "/storage/proposals/" + proposal_id + "/proposal.pdf"}
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
        <>
    
            <form onSubmit={handleSubmit}>
               
                <div className='row' >

                        <div className='col-lg-4'>
                            { showPdf ? 
                            <div className="alert alert-secondary" role="alert">
                                <div className='row' >
                                    <div className="d-lg-flex justify-content-center align-items-center">

                                        <div className='col text-center'><ShowPDFDocument/></div>
                                        <div className='col ml-2'> 
                                         <p>You've successfully attached a PDF Document to this proposal.</p>
                                        </div>


                                    </div>
                                    
                                </div>
                            </div>     
                            :
                            <div className="alert alert-secondary" role="alert">
                                <p>Please convert you DOCUMENT into PDF before uploading.</p>
                            </div>
                            }
                        </div>
                        <div className='col-lg-8'>
                            <div className='row'>

                                <div className='col-lg-10'>
                                    <div className="input-group mb-3">

                                        { !isDisabled ? 
                                            <input 
                                            type="file"
                                            required
                                            accept="application/pdf"
                                            className={"form-control" + (errors ? ' is-invalid' : uploaded ? ' is-valid' : '' )}
                                            onChange={handleChange} 
                                            />
                                        :
                                            <input 
                                            type="file"
                                            disabled
                                            accept="application/pdf"
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
                                    <p>Sila lampirkan konten berbentuk dokumen PDF. Saiz MAKSIMUM dokumen PDF yang disarankan adalah 25MB.</p>
                                    { uploadPercentage ? 
                                    <Progress percentage={uploadPercentage} />
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

export default Pdf;