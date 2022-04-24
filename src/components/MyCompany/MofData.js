import React from 'react';
import apiClient from '../../services/api';
import {Modal, Button, Form} from 'react-bootstrap';
const collect = require('collect.js'); 

const MofData = () => {

  const initialValues = {
    mof_registration_number: { value: '' ,error: '' },
  }
  const [state, setState] = React.useState(initialValues)

  // change input value dynamically
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
  const handleClose = (e) => {
    setShow(false);
    handleSubmit(e);
  }
  
  const handleShow = () => {
    setShow(true);
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
  apiClient.post('/api/company/update_profile', {
      mof_registration_number: state.mof_registration_number.value,

  }).then(response => {
      //console.log(response);
      if (response.status === 200) {
        console.log(response.data)
      }
  }).catch(error => {
     
      if (error.response.status === 422) {
          const errors = collect(error.response.data.errors); 
          errors.each( (error,field) => {
              updateStateError(field,error)  
          })
      }
  });
}

  
  React.useEffect(() => {
    const abortCont = new AbortController();
    apiClient.get('/api/company/show_profile', { signal: abortCont.signal} )
    .then(response => {
        console.log(response)
 
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

console.log(state.mof_registration_number.value)
    
    return (
      <div className="card mt-3">
      <h5 className="card-header">          
      <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
      <span className="float-start"> Ministry of Finance</span>

      <a  className=" btn btn-sm btn-primary m-1" onClick={handleShow}>Edit</a>
      
      </div>
      </h5>  
      
      <div className="card-body">
      <div>
          <dl className="row">
              <dt className="col-sm-3">MOF Registration</dt>
              <dd className="col-sm-9">{state.mof_registration_number.value}</dd>
{/* 
              <dt className="col-sm-3">Expiry Date</dt>
              <dd className="col-sm-9">{state.mof_expiry_date.value}</dd>

              <dt className="col-sm-3">MOF Status</dt>
              <dd className="col-sm-9">
                {state.is_mof_active ? 
               <span className="text-success">Active</span> 
              : 
              <span className="text-danger">Inactive</span>
              }
              </dd>

              <dt className="col-sm-3">MOF Certificate</dt>
              <dd className="col-sm-9">
                  { state.is_mof_cert_uploaded.value ? 
                  <button className='btn btn-primary btn-sm'>View Document</button>
                  :
                  <span className="text-danger">Please upload MOF certifacate ( PDF )</span>
                  }
              </dd> */}

        
          </dl>
      </div>
      </div>


  <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ministry of Finance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
            <Form.Label>MOF Registration</Form.Label>
            <Form.Control
              name="mof_registration_number"
              onChange={handleChange}
              type="text"
              value={state.mof_registration_number.value}
              placeholder="Enter MOF Registration Number"
              autoFocus
            />
          </Form.Group>
{/* 
          <Form.Group className="mb-3">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              name="mof_expiry_date"
              onChange={handleChange}
              value={state.mof_expiry_date}
              type="date"
              placeholder="Choose MOF Expiry Date"
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>eProlehan Status ?</Form.Label>
            <Form.Check 
              name="mof_is_mof_active"
              onChange={handleChange}
              type="checkbox" 
              label="Active" 
              value={state.is_mof_active}  
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload MOF Certificate</Form.Label>
            <Form.Control type="file" />
          </Form.Group> */}


        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>

      </div>
    );
};

export default MofData;