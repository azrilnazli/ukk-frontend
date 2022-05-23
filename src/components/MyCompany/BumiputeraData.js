import React from 'react';
import apiClient from '../../services/api';
import {Modal, Button, Form} from 'react-bootstrap';
import FileUpload from './FileUpload';
import config from '../../config.json'
import TextField from '../Widgets/TextField';

const collect = require('collect.js'); 

const BumiputeraData = () => {

  const [isPending, setIsPending] = React.useState(true)
  // load data from server
  React.useEffect(() => {
    const abortCont = new AbortController();
    apiClient.get('/api/company/bumiputera', { signal: abortCont.signal} )
    .then(response => {
      setIsPending(false)
        //console.log(response)
 
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

  // bumiputera related fields
  const initialValues = {
    id: { value: '' ,error: '' },
    bumiputera_registration_number: { value: null ,error: '' },
    is_bumiputera: { value: '0' ,error: '' },
    is_bumiputera_cert_uploaded: { value: '' ,error: '' },
    bumiputera_expiry_date: { value: '' ,error: '' },
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

    // set the state
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
  apiClient.post('/api/company/update_bumiputera', {
      bumiputera_registration_number: state.bumiputera_registration_number.value,
      is_bumiputera: state.is_bumiputera.value,
      is_bumiputera_cert_uploaded: state.is_bumiputera_cert_uploaded.value,
      bumiputera_expiry_date:  state.bumiputera_expiry_date.value
  }).then(response => {
      //console.log(response);
      //console.log(state.id.value)
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
    formData.append('document', 'bumiputera_cert.pdf'); // force the filename on server
    formData.append('field', 'is_bumiputera_cert_uploaded'); // db field
    formData.append("selectedFile", selectedFile); // input name = selectedFile

    // axios 
    apiClient({
        method: "post",
        url: "/api/company/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(response => {
      //console.log(response.data.is_bumiputera_cert_uploaded)
      updateStateValue('is_bumiputera_cert_uploaded',response.data.is_bumiputera_cert_uploaded )
      updateStateValue('id',response.data.id ) // to be used for PDF display
      setShow(false) // open the modal
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
        <span className="float-start"> Bumiputera Status</span>

        <a  className=" btn btn-sm btn-primary m-1" onClick={handleShow}>Edit</a>
        
        </div>
        </h5>  
        
        { !isPending ? 
        <div className="card-body">
          { state.bumiputera_registration_number.value != null ? 
          <div>
            <dl className="row">
                <dt className="col-sm-3">Bumiputera Registration</dt>
                <dd className="col-sm-9">{state.bumiputera_registration_number.value}</dd>

                <dt className="col-sm-3">Expiry Date</dt>
                <dd className="col-sm-9">{state.bumiputera_expiry_date.value}</dd>

                <dt className="col-sm-3">Bumiputera Status</dt>
                <dd className="col-sm-9">
                  {state.is_bumiputera.value == 1 ? 
                  <span className="badge rounded-pill bg-success">Bumiputera</span> 
                  : 
                  <span className="badge rounded-pill bg-danger">Non-Bumiputera</span> 
                  } 
                </dd>

                <dt className="col-sm-3">Bumiputera Certificate</dt>
                <dd className="col-sm-9">
                    { state.is_bumiputera_cert_uploaded.value ? 
                    <button onClick={handleShowPdf} className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload Bumiputera certifacate ( PDF )</span>
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
        <Modal.Title>Bumiputera Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <embed
        src={ config.SERVER_URL + "/storage/companies/" + state.id.value + "/bumiputera_cert.pdf?" + Date().toLocaleString() }
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
        <Modal.Title>Bumiputera Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Bumiputera Status ?</Form.Label>
            <Form.Check 
              name="is_bumiputera"
              onChange={handleChange}
              type="radio" 
              label="Bumiputera" 
              value="1"
              //className={"form-control" + (state.is_bumiputera.error ? ' is-invalid' : '')}
              checked={state.is_bumiputera.value == 1 ? 'checked' : ''} 
        
            />
            
            <Form.Check 
              name="is_bumiputera"
              onChange={handleChange}
              type="radio" 
              label="Non-Bumiputera" 
              value="0"
              //className={"form-control" + (state.is_bumiputera.error ? ' is-invalid' : '')}
              checked={state.is_bumiputera.value == 0 ? 'checked' : ''} 
          
            />
            {state.is_bumiputera.error ? 
              <p className='text-danger'><strong>{state.is_bumiputera.error}</strong></p>
            :
              null
            }
          </Form.Group>

          <Form.Group className="mb-3">
          <TextField
                    is_disabled={state.is_bumiputera.value}
                    label="Bumiputera Registration Number"          
                    name="bumiputera_registration_number"
                    onChange={handleChange}
                    type="text"
                    value={state.bumiputera_registration_number.value}
                    placeholder="Enter your company Bumiputera registration number"
                    error={state.bumiputera_registration_number.error}
                />
          </Form.Group>

          <Form.Group className="mb-3">
          <TextField
                    is_disabled={state.is_bumiputera.value}
                    label="Bumiputera Expiry Date"          
                    name="bumiputera_expiry_date"
                    onChange={handleChange}
                    type="date"
                    value={state.bumiputera_expiry_date.value}
                    placeholder="Enter your company Bumiputera Expiry Date"
                    error={state.bumiputera_expiry_date.error}
                />
          </Form.Group>


          {state.is_bumiputera.error ? 
            <span className="invalid-feedback" ><strong>{state.is_bumiputera.error}</strong></span> 
          : 
             null 
          }  

          <Form.Group className="mb-3">
            {/* <Form.Label>Upload MOF Certificate</Form.Label>
            <Form.Control 
              onChange={handleFileSelect}
              accept=".pdf"
              type="file" 
            /> */}
                   <TextField
                    is_disabled={state.is_bumiputera.value}
                    label="Bumiputera Certificate"          
                    name="bumiputera_expiry_date"
                    onChange={handleFileSelect}
                    type="file"
                    // value={state.bumiputera_expiry_date.value}
                    placeholder="Upload your company MOF certificate"
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

export default BumiputeraData;