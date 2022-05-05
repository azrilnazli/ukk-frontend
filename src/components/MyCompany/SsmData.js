import React from 'react';
import apiClient from '../../services/api';
import {Modal, Button, Form} from 'react-bootstrap';
import FileUpload from './FileUpload';
import config from '../../config.json'
import TextField from '../Widgets/TextField';

const collect = require('collect.js'); 

const SsmData = () => {

  // load data from server
  React.useEffect(() => {
    const abortCont = new AbortController();
    apiClient.get('/api/company/ssm', { signal: abortCont.signal} )
    .then(response => {
        setIsPending(false)
        const fields = collect(response.data.data);
       // console.log(fields)
         fields.each( (value,field) => {
             //console.log(field + ":" + value)
             updateStateValue(field, value)
         })
    })
    .catch(error => console.error(error));
    return () => abortCont.abort();    
  }, [] ); // Empty array [] means this only run on first render

  // ssm related fields
  const initialValues = {
    id: { value: '' ,error: '' },
    ssm_registration_number: { value: null ,error: '' },
    is_ssm_cert_uploaded: { value: '' ,error: '' },
    ssm_expiry_date: { value: '' ,error: '' },
    selectedFile: { value: '' ,error: '' },
  }

  const [state, setState] = React.useState(initialValues)
  const [isPending, setIsPending] = React.useState(true)

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

  const [show, setShow] = React.useState(false)
  const handleClose = () => {
    setShow(false);
  }
  
  const handleShow = () => {
    setShow(true);
  }

  const [showPdf, setShowPdf] = React.useState(false)
  const handleClosePdf = () => {
    setShowPdf(false);
  }
  
  const handleShowPdf = () => {
    setShowPdf(true);
  }

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
  apiClient.post('/api/company/update_ssm', {
      ssm_registration_number: state.ssm_registration_number.value,
      is_ssm_cert_uploaded: state.is_ssm_cert_uploaded.value,
      ssm_expiry_date:  state.ssm_expiry_date.value
  }).then(response => {
      if (response.status === 200) {
        if(selectedFile){
          handleUpload(e)
        } else {
          setShow(false) // close the modal
        }
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
    formData.append('document', 'ssm_cert.pdf'); // force the filename on server
    formData.append('field', 'is_ssm_cert_uploaded'); // db field
    formData.append("selectedFile", selectedFile); // input name = selectedFile

    // axios 
    apiClient({
        method: "post",
        url: "/api/company/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(response => {
      setShow(false) // open the modal
      console.log(response.data.is_ssm_cert_uploaded)
      updateStateValue('is_ssm_cert_uploaded',response.data.is_ssm_cert_uploaded )
      updateStateValue('id',response.data.id ) // to be used for PDF display
    }).catch(error => {
      //console.error(error)
      setShow(true) // open the modal
      if (error.response.status === 422) {

        const errors = collect(error.response.data.errors); 
        console.log(errors)
        errors.each( (error,field) => {
            updateStateError(field,error)  
        })
      }
    })

}

const handleFileSelect = (event) => {
  setSelectedFile(event.target.files[0])
}

const [fullscreen, setFullscreen] = React.useState(true);

//console.log(state.ssm_registration_number.value)

    return (
      <div className="card mt-3">
        <h5 className="card-header">          
          <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
            <span className="float-start">Suruhanjaya Syarikat Malaysia</span>
            <a className=" btn btn-sm btn-primary m-1" onClick={handleShow}>Edit</a>
          </div>
        </h5>  
        
        { !isPending ?
        <div className="card-body">
          { state.ssm_registration_number.value != null ? 
          <div>
            <dl className="row">
                <dt className="col-sm-3">SSM Registration</dt>
                <dd className="col-sm-9">{state.ssm_registration_number.value}</dd>

                <dt className="col-sm-3">Expiry Date</dt>
                <dd className="col-sm-9">{state.ssm_expiry_date.value}</dd>

                <dt className="col-sm-3">SSM Certificate</dt>
                <dd className="col-sm-9">
                    { state.is_ssm_cert_uploaded.value ? 
                    <button onClick={handleShowPdf} className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload SSM certifacate ( PDF )</span>
                    }
                </dd>
            </dl>
          </div>
          : <span className='text-danger'>No data</span> }
        </div>
      : <div className="card-body">...loading</div> }


  <>
  <Modal fullscreen={fullscreen}  show={showPdf} onHide={handleClosePdf}>
      <Modal.Header closeButton>
        <Modal.Title>Ministry of Finance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      { config.SERVER_URL + "/storage/companies/" + state.id.value + "/ssm_cert.pdf"}
      <embed
        src={ config.SERVER_URL + "/storage/companies/" + state.id.value + "/ssm_cert.pdf"}
        type="application/pdf"
        frameBorder="0"
        scrolling="auto"
        height="100%"
        width="100%"
      ></embed>
      </Modal.Body>
    </Modal>


    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Suruhanjaya Syarikat Malaysia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
          <TextField
                    label="SSM Registration Number"          
                    name="ssm_registration_number"
                    onChange={handleChange}
                    type="text"
                    value={state.ssm_registration_number.value}
                    placeholder="Enter your company SSM registration number"
                    error={state.ssm_registration_number.error}
                />
          </Form.Group>

          <Form.Group className="mb-3">
          <TextField
                    label="SSM Expiry Date"          
                    name="ssm_expiry_date"
                    onChange={handleChange}
                    type="date"
                    value={state.ssm_expiry_date.value}
                    placeholder="Enter your company ssm Expiry Date"
                    error={state.ssm_expiry_date.error}
                />
          </Form.Group>


          <Form.Group className="mb-3">
            {/* <Form.Label>Upload ssm Certificate</Form.Label>
            <Form.Control 
              onChange={handleFileSelect}
              accept=".pdf"
              type="file" 
            /> */}
                   <TextField
                    label="SSM Certificate"          
                    name="ssm_cert"
                    onChange={handleFileSelect}
                    type="file"
                    // value={state.ssm_expiry_date.value}
                    placeholder="Upload your company ssm certificate"
                    error={state.selectedFile.error}
                />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>

      </div>
    );
};

export default SsmData;