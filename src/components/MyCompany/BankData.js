import React from 'react';
import apiClient from '../../services/api';
import {Modal, Button, Form} from 'react-bootstrap';
import FileUpload from './FileUpload';
import config from '../../config.json'
import TextField from '../Widgets/TextField';

const collect = require('collect.js'); 

const BankData = () => {

  const [isPending, setIsPending] = React.useState(true)
  // load data from server
  React.useEffect(() => {
    const abortCont = new AbortController();
    apiClient.get('/api/company/bank', { signal: abortCont.signal} )
    .then(response => {
        //console.log(response)
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

  // current_audit_year related fields
  const initialValues = {
    id: { value: '' ,error: '' },
    bank_name: { value: null ,error: '' },
    bank_branch: { value: '' ,error: '' },
    bank_account_number: { value: '' ,error: '' },
    bank_statement_date_start: { value: '' ,error: '' },
    bank_statement_date_end: { value: '' ,error: '' },
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
  //console.log('submit')

  // reset the error
  const fields = collect(state);
  fields.each( (error,field) => {
      updateStateError(field, null)
  })

  // post the data
  apiClient.post('/api/company/update_bank', {
      bank_name:  state.bank_name.value,
      bank_branch:  state.bank_branch.value,
      bank_account_number:  state.bank_account_number.value,
      bank_statement_date_start:  state.bank_statement_date_start.value,
      bank_statement_date_end:  state.bank_statement_date_end.value
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
     
        //console.error(error)
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
    formData.append('document', 'bank_cert.pdf'); // force the filename on server
    formData.append('field', 'is_bank_cert_uploaded'); // db field
    formData.append("selectedFile", selectedFile); // input name = selectedFile

    // axios 
    apiClient({
        method: "post",
        url: "/api/company/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(response => {
      setShow(false) // open the modal
      //console.log(response.data.is_bank_cert_uploaded)
      updateStateValue('is_current_audit_year_cert_uploaded',response.data.is_current_audit_year_cert_uploaded )
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

//console.log(state.current_audit_year.value)

    return (
      <div className="card mt-3">
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start">Banking Data</span>

        <a  className=" btn btn-sm btn-primary m-1" onClick={handleShow}>Edit</a>
        
        </div>
        </h5>  
        { !isPending ? 
        <div className="card-body">
          { state.bank_name.value != null ? 
          <div>
            <dl className="row">
                <dt className="col-sm-3">Bank Name</dt>
                <dd className="col-sm-9">{state.bank_name.value}</dd>

                <dt className="col-sm-3">Bank Branch</dt>
                <dd className="col-sm-9">{state.bank_branch.value}</dd>
                
                <dt className="col-sm-3">Bank Account Number</dt>
                <dd className="col-sm-9">{state.bank_account_number.value}</dd>

                <dt className="col-sm-3">Bank Statement Date Start</dt>
                <dd className="col-sm-9">{state.bank_statement_date_start.value}</dd>

                <dt className="col-sm-3">Bank Statement Date End</dt>
                <dd className="col-sm-9">{state.bank_statement_date_end.value}</dd>


                <dt className="col-sm-3">Bank Statement</dt>
                <dd className="col-sm-9">
                    { state.bank_name.value ? 
                    <button onClick={handleShowPdf} className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload latest bank statement ( PDF )</span>
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
        <Modal.Title>Audit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      { config.SERVER_URL + "/storage/companies/" + state.id.value + "/bank_cert.pdf"}
      <embed
        src={ config.SERVER_URL + "/storage/companies/" + state.id.value + "/bank_cert.pdf"}
        type="application/pdf"
        frameBorder="0"
        scrolling="auto"
        height="100%"
        width="100%"
      ></embed>
      </Modal.Body>
    </Modal>


    <Modal size="md" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ministry of Finance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
          <TextField
                    label="Bank Name"          
                    name="bank_name"
                    onChange={handleChange}
                    type="text"
                    value={state.bank_name.value}
                    placeholder="Enter your bank name"
                    error={state.bank_name.error}
                />
          </Form.Group>

          <Form.Group className="mb-3">
          <TextField
                    label="Bank Branch"          
                    name="bank_branch"
                    onChange={handleChange}
                    type="text"
                    value={state.bank_branch.value}
                    placeholder="Enter your bank branch"
                    error={state.bank_branch.error}
                />
          </Form.Group>

          <Form.Group className="mb-3">
          <TextField
                    label="Bank Account Number"          
                    name="bank_account_number"
                    onChange={handleChange}
                    type="text"
                    value={state.bank_account_number.value}
                    placeholder="Enter your bank account number"
                    error={state.bank_account_number.error}
                />
          </Form.Group>

          <Form.Group className="mb-3">
          <TextField
                    label="Bank Statement Date Start"          
                    name="bank_statement_date_start"
                    onChange={handleChange}
                    type="date"
                    value={state.bank_statement_date_start.value}
                    placeholder="Enter your bank name"
                    error={state.bank_statement_date_start.error}
                />
          </Form.Group>

          <Form.Group className="mb-3">
          <TextField
                    label="Bank Statement Date End"          
                    name="bank_statement_date_end"
                    onChange={handleChange}
                    type="date"
                    value={state.bank_statement_date_end.value}
                    placeholder="Enter your bank name"
                    error={state.bank_statement_date_end.error}
                />
          </Form.Group>


          <Form.Group className="mb-3">
                   <TextField
                    label="Bank Statement"          
                    name="bank_cert"
                    onChange={handleFileSelect}
                    type="file"
                    // value={state.current_audit_year.value}
                    placeholder="Upload your latest bank statement"
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

export default BankData;