import React from 'react';
import apiClient from '../../services/api';
import TextField from '../Widgets/TextField';
import TextArea from '../Widgets/TextArea';
import {Modal, Button, Form} from 'react-bootstrap';
import Video from '../MyProposal/Video';
import Pdf from '../MyProposal/Pdf';
const collect = require('collect.js'); 

const SubmissionForm = ({tender_id}) => {
      // load data from server
      const [isPending, setIspending] = React.useState(true);
      const [systemMsg, setSystemMsg] = React.useState(false);
      const [tenderSubmissionId, setTenderSubmissionId] = React.useState('');

      React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/proposal/show/' + state.tender_id.value, { signal: abortCont.signal} )
        .then(response => {
          
           // console.log(response)
            setIspending(false)
            if(response.data.exists === true){
                setTenderSubmissionId(response.data.proposal.id)
                const fields = collect(response.data.proposal);
                // console.log(fields)
                fields.each( (value,field) => {
                    updateStateValue(field, value)
                })
            }
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render


    // TenderSubmission related fields
    const initialValues = {
        id: { value: '' ,error: '' }, // TenderSubmission 
        tender_id: { value: tender_id ,error: '' }, // Tender
        video_id: { value: '' ,error: '' }, // Video
        theme: { value: '' ,error: '' },
        genre: { value: '' ,error: '' },
        concept: { value: '' ,error: '' },
        synopsis: { value: '' ,error: '' },
        is_pdf: { value: '' ,error: '' },
        is_video: { value: '' ,error: '' },
        selectedFile: { value: '' ,error: '' },
    }
    const [state, setState] = React.useState(initialValues)

    //change input value dynamically
    const updateStateValue = (field,value) => {
  
        setState(prevState => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value: value,   
                }
            }));
    };
  
    // change input value dynamically
    const updateStateError = (field,error) => {
  
        setState(prevState => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                error: error,   
                }
            }));
    };

    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target; // object
    
        setState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                value: value,
            },
         }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log('submit')
      
        // reset the error
        const fields = collect(state);
        fields.each( (error,field) => {
            updateStateError(field, null)
        })
      
        // post the data
        apiClient.post('/api/tender/update_proposal', {
            tender_id: state.tender_id.value,
            video_id: state.video_id.value,
            theme: state.theme.value,
            genre: state.genre.value,
            concept: state.concept.value,
            synopsis: state.synopsis.value,
        }).then(response => {
            console.log(response);
          
            if (response.status === 200) {
             
                // Proposal PDF
                if(selectedFile){
                    handleUpload(e)
                }

                setTenderSubmissionId(response.data.id)
                //console.log(response.data)

                setSystemMsg(true)
                setTimeout( () => setSystemMsg(false), 5000 ); // hide after 10 seconds
            }
        }).catch(error => {
           
            if (error.response.status === 422) {
                const errors = collect(error.response.data.errors); 
                errors.each( (error,field) => {
                    updateStateError(field,error)  
                })
            }
        });
    } // handleSubmit

    // file related constants
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [isFileUploaded, setIsFileUploaded] = React.useState(null);

    const handleUpload = (e) => {


        // JS formData
        const formData = new FormData();
        formData.append('document', 'proposal.pdf'); // force the filename on server
        formData.append('field', 'is_pdf'); // db field
        formData.append("selectedFile", selectedFile); // input name = selectedFile

        // axios 
        apiClient({
            method: "post",
            url: "/api/tender_submission/upload_pdf",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(response => {
           
            updateStateValue('id',response.data.id ) // to be used for PDF display
            
        }).catch(error => {
            if (error.response.status === 422) {
                const errors = collect(error.response.data.errors); 
                //console.log(errors)
                errors.each( (error,field) => {
                    updateStateError(field,error)  
                })
            }
        })
    }
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

   

    return (
        <>
   
            <div className="card mt-3">
                <div className="card-header">
                        <h5>PROPOSAL DETAILS</h5>
                </div>

        
                <div className="card-body">

                    { systemMsg ? 
                    <div className='alert alert-success'>
                        You proposals successfully updated. Your ID is {tenderSubmissionId}.
                    </div>
                    :
                    <div className='alert alert-info'>
                        Please complete this form before being able to upload VIDEO or PDF.
                    </div>
                    }

                    <Form>
                        <Form.Group className=" mb-3 col-lg-6">
                                <TextField
                                    label="Theme"          
                                    name="theme"
                                    onChange={handleChange}
                                    type="text"
                                    value={state.theme.value}
                                    placeholder="Theme"
                                    error={state.theme.error}
                                    required="required"
                                />
                        </Form.Group>
                
                        <Form.Group className=" mb-3 col-lg-6">
                            <TextField
                                label="Genre"          
                                name="genre"
                                onChange={handleChange}
                                type="text"
                                value={state.genre.value}
                                placeholder="Genre"
                                error={state.genre.error}
                                />
                        </Form.Group>
                
                        <Form.Group className="mb-3">
                    
                            <TextArea
                                    label="Concept"          
                                    name="concept"
                                    onChange={handleChange}
                                    value= {state.concept.value}
                                    placeholder="Enter your concept"
                                    error={state.concept.error}
                            />
                        </Form.Group>
                
                        <Form.Group className="mb-3">
                            <TextArea
                                    label="Synopsis"          
                                    name="synopsis"
                                    onChange={handleChange}
                                    placeholder="Enter you synopsis"
                                    value={state.synopsis.value}
                                
                                    error={state.synopsis.error}
                            />
                        </Form.Group>

            
                        <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                        </Button>
                    </Form>

              
                    
                </div>
            
            </div>
    
            {tenderSubmissionId ?
            <div className="card mt-3">
                <div className="card-header">
                        <h5>VIDEO</h5>
                </div>

                <div className="card-body">
                        
                    <Video tender_id={state.tender_id.value} proposal_id={tenderSubmissionId} /> 
        
                </div>
            </div>
            : null }


            {tenderSubmissionId ?
            <div className="card mt-3">
                <div className="card-header">
                        <h5>PDF</h5>
                </div>

                <div className="card-body">
                        
                  <Pdf tender_id={state.tender_id.value} proposal_id={tenderSubmissionId} />
                </div>
            </div>
            : null }
       
        </>
    );
    
      
};

export default SubmissionForm;