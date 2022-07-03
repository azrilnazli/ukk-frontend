import React from 'react';
import apiClient from '../../services/api';
import TextField from '../Widgets/TextField';
import TextArea from '../Widgets/TextArea';
import {Modal, Button, Form} from 'react-bootstrap';
import Video from '../MyProposal/Video';
import Pdf from '../MyProposal/Pdf';
const collect = require('collect.js'); 

const SubmissionFormTypeB = ({tender_id}) => {
      // load data from server
      const [isPending, setIspending] = React.useState(true);
      const [systemMsg, setSystemMsg] = React.useState(false);
      const [status, setStatus] = React.useState();
      const [message, setMessage] = React.useState('');
      const [tenderSubmissionId, setTenderSubmissionId] = React.useState('');

    //   Pembekal can apply as many tender
    //   React.useEffect(() => {
    //     const abortCont = new AbortController();
    //     apiClient.get('/api/proposal/show/' + state.tender_id.value, { signal: abortCont.signal} )
    //     .then(response => {
          
    //        // console.log(response)
    //         setIspending(false)
    //         if(response.data.exists === true){
    //             setTenderSubmissionId(response.data.proposal.id)
    //             const fields = collect(response.data.proposal);
    //             // console.log(fields)
    //             fields.each( (value,field) => {
    //                 updateStateValue(field, value)
    //             })
    //         }
    //     })
    //     .catch(error => console.error(error));
    //     return () => abortCont.abort();    
    // }, [] ); // Empty array [] means this only run on first render


    // TenderSubmission related fields
    const initialValues = {
        id: { value: '' ,error: '' }, // TenderSubmission 
        tender_id: { value: tender_id ,error: '' }, // Tender
        video_id: { value: '' ,error: '' }, // Video

        synopsis: { value: '' ,error: '' },
        published_year: { value: '' ,error: '' },
        casts: { value: '' ,error: '' },
        country: { value: '' ,error: '' },
        languages: { value: '' ,error: '' },
        total_episode: { value: '' ,error: '' },
        duration: { value: '' ,error: '' },
        price_episode: { value: '' ,error: '' },
        price_overall: { value: '' ,error: '' },
        rules: { value: '' ,error: '' },
        informations: { value: '' ,error: '' },

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
        apiClient.post('/api/tender-submissions/store', {
            tender_id: state.tender_id.value,
            video_id: state.video_id.value,
      
            synopsis: state.synopsis.value,
            published_year: state.published_year.value,
            casts: state.casts.value,
            country: state.country.value,
            languages: state.languages.value,
            total_episode: state.total_episode.value,
            duration: state.duration.value,
            price_episode: state.price_episode.value,
            price_overall: state.price_overall.value,
            rules: state.rules.value,
            informations: state.informations.value,

        }).then(response => {
            console.log(response);
          
            if (response.status === 200) {
             
                // success message
                setStatus('success');
                setMessage(response.data.message); 

                // Proposal PDF
                if(selectedFile){
                    handleUpload(e)
                }

                setTenderSubmissionId(response.data.tender_submission_id)
                //console.log(response.data)

                setSystemMsg(true)

                setTimeout( () => setSystemMsg(false), 5000 ); // hide after 10 seconds
            }
        }).catch(error => {
           
            setStatus('danger');

            if (error.response.status === 422) {
                const errors = collect(error.response.data.errors); 
                errors.each( (error,field) => {
                    updateStateError(field,error)  
                })
            }

            if (error.response.status === 423) {
                setMessage(error.response.data.message); 
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
           
            // should check status boolean
            // should check message
            // expecting
            
            updateStateValue('id',response.data.id ) // to be used for PDF display
            
        }).catch(error => {
            if (error.response.status === 422) {
                const errors = collect(error.response.data.errors); 
                //console.log(errors)
                errors.each( (error,field) => {
                    updateStateError(field,error)  
                })
            }
            if (error.response.status === 423) {
                const errors = collect(error.response.data.message); 
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
                        Type B Please complete this form before being able to upload VIDEO or PDF.
                    </div>
                    }

                    <Form>
                        <Form.Group className="mb-3">
                            <TextArea
                                    label="Synopsis"          
                                    name="synopsis"
                                    onChange={handleChange}
                                    placeholder="Enter programme synopsis"
                                    value={state.synopsis.value}
                                    error={state.synopsis.error}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <TextArea
                                    label="Casts"          
                                    name="casts"
                                    onChange={handleChange}
                                    placeholder="Enter programme casts"
                                    value={state.casts.value}
                                    error={state.casts.error}
                            />
                        </Form.Group>

                        <Form.Group className=" mb-3 col-lg-6">
                            <TextField
                                label="Published Year"          
                                name="published_year"
                                onChange={handleChange}
                                type="text"
                                value={state.published_year.value}
                                placeholder="Published Year eg ~ 1988"
                                error={state.published_year.error}
                                />
                        </Form.Group>

                        
                        <Form.Group className="mb-3">
                            <TextArea
                                    label="Languages"          
                                    name="languages"
                                    onChange={handleChange}
                                    placeholder="Enter languages used in the programme"
                                    value={state.languages.value}
                                    error={state.languages.error}
                            />
                        </Form.Group>

                        <Form.Group className=" mb-3 col-lg-6">
                            <TextField
                                label="Total Episode"          
                                name="total_episode"
                                onChange={handleChange}
                                type="text"
                                value={state.total_episode.value}
                                placeholder="Total Episode"
                                error={state.total_episode.error}
                                />
                        </Form.Group>

                        <Form.Group className=" mb-3 col-lg-6">
                            <TextField
                                label="Programme Duration"          
                                name="duration"
                                onChange={handleChange}
                                type="text"
                                value={state.duration.value}
                                placeholder="Duration"
                                error={state.duration.error}
                                />
                        </Form.Group>

                        <Form.Group className=" mb-3 col-lg-6">
                            <TextField
                                label="Country of Origin"          
                                name="country"
                                onChange={handleChange}
                                type="text"
                                value={state.country.value}
                                placeholder="Country eg JAPAN"
                                error={state.country.error}
                                />
                        </Form.Group>

                        <Form.Group className=" mb-3 col-lg-6">
                            <TextField
                                label="Price per Episode"          
                                name="price_episode"
                                onChange={handleChange}
                                type="text"
                                value={state.price_episode.value}
                                placeholder="Price per Episode eg ~ 25499"
                                error={state.price_episode.error}
                                />
                        </Form.Group>

                        <Form.Group className=" mb-3 col-lg-6">
                            <TextField
                                label="Price for Overall"          
                                name="price_overall"
                                onChange={handleChange}
                                type="text"
                                value={state.price_overall.value}
                                placeholder="Price for Overall Programme eg ~ 25499"
                                error={state.price_overall.error}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <TextArea
                                    label="Programme Rights"          
                                    name="rules"
                                    onChange={handleChange}
                                    placeholder="Please state Programme Rights eg All Rights ( Hakmilik RTM ) or Rent ..."
                                    value={state.rules.value}
                                    error={state.rules.error}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <TextArea
                                    label="Extra Informations"          
                                    name="informations"
                                    onChange={handleChange}
                                    placeholder="Extra Informations"
                                    value={state.informations.value}
                                    error={state.informations.error}
                            />
                        </Form.Group>
                        

                        <div className='row'>
                            <div className='col-md-1'>
                            {   
                                status === 'success' ?
                                <Button variant="secondary" disabled>
                                Submit
                                </Button>
                                :
                                <Button variant="primary" onClick={handleSubmit}>
                                Submit
                                </Button>                              
                            }
                            </div>
                            {   
                                message && 
                                <div className='col-md-6'>
                                    <span className={`text-${status}`}><strong>{ message }</strong></span> 
                                </div>
                            }
                        </div>
                    </Form>

              
                    
                </div>
            
            </div>
            {tenderSubmissionId &&
            <div className="card mt-3">
                <div className="card-header">
                        <h5>PDF</h5>
                </div>

                <div className="card-body">
                        
                  <Pdf tender_id={state.tender_id.value} proposal_id={tenderSubmissionId} />
                </div>
            </div>
            }            
    
            { tenderSubmissionId &&
                <div className="card mt-3">
                    <div className="card-header">
                            <h5>VIDEO</h5>
                    </div>

                    <div className="card-body">
                        <Video tender_id={state.tender_id.value} proposal_id={tenderSubmissionId} /> 
                    </div>
                </div>
            }



       
        </>
    );
};

export default SubmissionFormTypeB;