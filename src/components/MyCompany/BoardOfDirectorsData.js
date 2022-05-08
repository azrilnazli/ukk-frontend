import React from 'react';
import apiClient from '../../services/api';
import {Modal, Button, Form} from 'react-bootstrap';
import FileUpload from './FileUpload';
import config from '../../config.json'
import TextArea from '../Widgets/TextArea';

const collect = require('collect.js'); 

const BoardOfDirectors = () => {

  // mof related fields
  const initialValues = {
    id: { value: null ,error: '' },
    board_of_directors: { value: '' ,error: '' },
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
  console.log('submit')
  //updateStateValue('id', true)

  // reset the error
  const fields = collect(state);
  fields.each( (error,field) => {
      updateStateError(field, null)
  })

  // post the data
  apiClient.post('/api/company/update_board_of_directors', {
      board_of_directors: state.board_of_directors.value,
   

  }).then(response => {
      //console.log(response);
      //updateStateValue('id', response.data.id)
     
      if (response.status === 200) {
        console.log(response.data)
        setShow(false) // close the modal
     
        
        // upload file
        // if(selectedFile){
        //   console.log('upload')
        //   handleUpload(e)
        // }
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
const [isPending, setIspending] = React.useState(true);

    // load data from server
    React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/company/board_of_directors', { signal: abortCont.signal} )
        .then(response => {
            //console.log(response)
            setIspending(false)
        
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

    return (
      <div className="card mt-3">
        <style>
        {`#p-wrap {
            white-space: pre-line;
        }`}
        </style>
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start">Board of Directors</span>

        <a  className=" btn btn-sm btn-primary m-1" onClick={handleShow}>Edit</a>
        
        </div>
        </h5>  
        
        { !isPending ?
        <div className="card-body">
          { state.board_of_directors.value != '' ? 
          <div>
            <dl className="row">

                <dd className="col-sm-12"><p id="p-wrap">{state.board_of_directors.value}</p></dd>

            </dl>
          </div>
          : <span className='text-danger'>No data</span> }
      </div>
      : <div className="card-body">...loading</div> }
  <>
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Board of Directors</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          
          <Form.Group className="mb-3">
          <TextArea
                    label=""          
                    name="board_of_directors"
                    onChange={handleChange}

                    value={state.board_of_directors.value}
                    placeholder="Enter your company board_of_directors"
                    error={state.board_of_directors.error}
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
export default BoardOfDirectors;