import React from 'react';
import apiClient from '../../services/api';
import {Modal, Button, Form} from 'react-bootstrap';
import FileUpload from './FileUpload';
import config from '../../config.json'
import TextField from '../Widgets/TextField';
import StatesField from '../Widgets/StatesField';

const collect = require('collect.js'); 

const ProfileData = () => {



  // mof related fields
  const initialValues = {
    id: { value: null ,error: '' },
    name: { value: null ,error: '' },
    // registration_date: { value: '' ,error: '' },
    email: { value: '' ,error: '' },
    phone: { value: '' ,error: '' },
    address: { value: '' ,error: '' },
    postcode: { value: '' ,error: '' },
    city: { value: '' ,error: '' },
    states: { value: '' ,error: '' },
    board_of_directors: { value: '' ,error: '' },
    experiences: { value: '' ,error: '' },
     experiences: { value: '' ,error: '' },

  }

  const [state, setState] = React.useState(initialValues)
  const [isPending, setIsPending] = React.useState(true) // loading indicator

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
  //updateStateValue('id', true)

  // reset the error
  const fields = collect(state);
  fields.each( (error,field) => {
      updateStateError(field, null)
  })

  // post the data
  apiClient.post('/api/company/update_profile', {
      name: state.name.value,
      email: state.email.value,
      phone: state.phone.value,
      address: state.address.value,
      postcode: state.postcode.value,
      city: state.city.value,
      states: state.states.value,
  }).then(response => {
      if (response.status === 200) {
        setShow(false) // close the modal
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


const [fullscreen, setFullscreen] = React.useState(true);

    // load data from server
    React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/company/profile', { signal: abortCont.signal} )
        .then(response => {
            setIsPending(false)
            const fields = collect(response.data.data);
  
                fields.each( (value,field) => {
                    updateStateValue(field, value)
                })
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render

    return (
      <div className="card mt-3">
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start">Company Profile</span>

        <a  className=" btn btn-sm btn-primary m-1" onClick={handleShow}>Edit</a>
        
        </div>
        </h5>  
        
        { !isPending ? 
        <div className="card-body">

          { state.name.value != null ? 
          <div>
            <dl className="row">
                <dt className="col-sm-3">Name</dt>
                <dd className="col-sm-9">{state.name.value}</dd>

                <dt className="col-sm-3">Email</dt>
                <dd className="col-sm-9">{state.email.value}</dd>

                <dt className="col-sm-3">Phone</dt>
                <dd className="col-sm-9">{state.phone.value}</dd>

                <dt className="col-sm-3">Address</dt>
                <dd className="col-sm-9">{state.address.value}</dd>

                <dt className="col-sm-3">Postcode</dt>
                <dd className="col-sm-9">{state.postcode.value}</dd>

                <dt className="col-sm-3">City</dt>
                <dd className="col-sm-9">{state.city.value}</dd>

                <dt className="col-sm-3">State</dt>
                <dd className="col-sm-9">{state.states.value}</dd>

            </dl>
          </div>
          : <span className='text-danger'>No data</span> }
          </div>
        : <div className="card-body">...loading</div> }


  <>
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Company Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>   
          <Form.Group className="mb-3">

            <TextField
                  label="Name"          
                  name="name"
                  onChange={handleChange}
                  type="text"
                  value={state.name.value}
                  placeholder="Enter your company name"
                  error={state.name.error}
            />
          
          </Form.Group>

          <Form.Group className="mb-3">
            <TextField
                    label="Email"          
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={state.email.value}
                    placeholder="Enter your company email"
                    error={state.email.error}
                />
          </Form.Group>

          
          <Form.Group className="mb-3">
            <TextField
                    label="Phone"          
                    name="phone"
                    onChange={handleChange}
                    type="text"
                    value={state.phone.value}
                    placeholder="Enter your company phone"
                    error={state.phone.error}
                />
          </Form.Group>

          
          <Form.Group className="mb-3">
          <TextField
                    label="Address"          
                    name="address"
                    onChange={handleChange}
                    type="text"
                    value={state.address.value}
                    placeholder="Enter your company address"
                    error={state.address.error}
                />   
          </Form.Group>

          
          <Form.Group className="mb-3">
          <TextField
                    label="Postcode"          
                    name="postcode"
                    onChange={handleChange}
                    type="text"
                    value={state.postcode.value}
                    placeholder="Enter your company postcode"
                    error={state.postcode.error}
                />
          </Form.Group>

          
          <Form.Group className="mb-3">
          <TextField
                    label="City"          
                    name="city"
                    onChange={handleChange}
                    type="text"
                    value={state.city.value}
                    placeholder="Enter your company city"
                    error={state.city.error}
                />
          </Form.Group>

          
          <Form.Group className="mb-3">
          {/* <TextField
                    label="State"          
                    name="states"
                    onChange={handleChange}
                    type="text"
                    value={state.states.value}
                    placeholder="Enter your company state"
                    error={state.states.error}
                /> */}


          <StatesField
                    label="State"          
                    name="states"
                    onChange={handleChange}
                    value={state.states.value}
                    placeholder="Enter your company state"
                    error={state.states.error}
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
export default ProfileData;