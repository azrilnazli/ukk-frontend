import React from 'react';
import apiClient from '../../services/api';
import {Modal, Button, Form} from 'react-bootstrap';
import FileUpload from './FileUpload';
import config from '../../config.json'
import TextField from '../Widgets/TextField';

const collect = require('collect.js'); 

const FinasFPData = () => {

  const [isPending, setIsPending] = React.useState(true)
  // load data from server
  React.useEffect(() => {
    const abortCont = new AbortController();
    apiClient.get('/api/company/finas_fp', { signal: abortCont.signal} )
    .then(response => {
        //console.log(response)
        setIsPending(false)
        const fields = collect(response.data.data);
        //console.log(fields)
         fields.each( (value,field) => {
  
             //console.log(field + ":" + value)
             updateStateValue(field, value)
         })
    })
    .catch(error => console.error(error));
    return () => abortCont.abort();    
  }, [] ); // Empty array [] means this only run on first render

  // finas_fp related fields
  const initialValues = {
    id: { value: '' ,error: '' },
    finas_fp_registration_number: { value: null ,error: '' },
    //is_finas_fp_active: { value: '' ,error: '' },
    is_finas_fp_cert_uploaded: { value: '' ,error: '' },
    finas_fp_expiry_date: { value: '' ,error: '' },
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
    //console.log(e.target.value)
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
  //console.log('submit')

  // reset the error
  const fields = collect(state);
  fields.each( (error,field) => {
      updateStateError(field, null)
  })

  // post the data
  apiClient.post('/api/company/update_finas_fp', {
      finas_fp_registration_number: state.finas_fp_registration_number.value,
      //is_finas_fp_active: state.is_finas_fp_active.value,
      is_finas_fp_cert_uploaded: state.is_finas_fp_cert_uploaded.value,
      finas_fp_expiry_date:  state.finas_fp_expiry_date.value
  }).then(response => {
      //console.log(response);
    
      if (response.status === 200) {
       
        //console.log(response.data)
          // upload file

        if(selectedFile){
          //console.log('upload')
          handleUpload(e)
        } else {
          setShow(false) // close the modal
        }

        
      }
  }).catch(error => {
     
        console.error(error)
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
    formData.append('document', 'finas_fp_cert.pdf'); // force the filename on server
    formData.append('field', 'is_finas_fp_cert_uploaded'); // db field
    formData.append("selectedFile", selectedFile); // input name = selectedFile

    // axios 
    apiClient({
        method: "post",
        url: "/api/company/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(response => {
      setShow(false) // open the modal
      //console.log(response.data.is_finas_fp_cert_uploaded)
      updateStateValue('is_finas_fp_cert_uploaded',response.data.is_finas_fp_cert_uploaded )
      updateStateValue('id',response.data.id ) // to be used for PDF display
    }).catch(error => {
      //console.error(error)
      setShow(true) // open the modal
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

const [fullscreen, setFullscreen] = React.useState(true);

    return (
      <div className="card mt-3">
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start">FINAS (PF)</span>

        <a  className=" btn btn-sm btn-primary m-1" onClick={handleShow}>Edit</a>
        
        </div>
        </h5>  
        
      { !isPending ?
        <div className="card-body">
          { state.finas_fp_registration_number.value != null ? 
          <div>
            <dl className="row">
                <dt className="col-sm-3">FINAS PF Registration</dt>
                <dd className="col-sm-9">{state.finas_fp_registration_number.value}</dd>

                <dt className="col-sm-3">Expiry Date</dt>
                <dd className="col-sm-9">{state.finas_fp_expiry_date.value}</dd>

                <dt className="col-sm-3">FINAS (PF) Certificate</dt>
                <dd className="col-sm-9">
                    { state.is_finas_fp_cert_uploaded.value ? 
                    <button onClick={handleShowPdf} className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload FINAS (PF) certifacate ( PDF )</span>
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
        <Modal.Title>FINAS (PF)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
      <embed
        src={ config.SERVER_URL + "/storage/companies/" + state.id.value + "/finas_fp_cert.pdf?" + Date().toLocaleString() }
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
        <Modal.Title>Finas (PF)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
          <TextField
                    label="FINAS (PF) Registration Number"          
                    name="finas_fp_registration_number"
                    onChange={handleChange}
                    type="text"
                    value={state.finas_fp_registration_number.value}
                    placeholder="Enter your company finas_fp registration number"
                    error={state.finas_fp_registration_number.error}
                />
          </Form.Group>

          <Form.Group  className="col-md-6 mb-3">
          <TextField
                    label="FINAS (PF) Expiry Date"          
                    name="finas_fp_expiry_date"
                    onChange={handleChange}
                    type="date"
                    value={state.finas_fp_expiry_date.value}
                    placeholder="Enter your company finas_fp Expiry Date"
                    error={state.finas_fp_expiry_date.error}
                />
          </Form.Group>


          <Form.Group  className="col-md-6 mb-3">
 
                   <TextField
                    label="FINAS (PF) Certificate"          
                    name="file"
                    onChange={handleFileSelect}
                    type="file"
                    accept="application/pdf"
                    placeholder="Upload your company FINAS (PF) certificate ( PDF Format )"
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
export default FinasFPData;