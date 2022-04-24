import React from 'react';
import apiClient from '../../services/api';
import {Modal, Button, Form} from 'react-bootstrap';

const MofData = (company) => {

    const [show, setShow] = React.useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
                <dd className="col-sm-9">{company.mof_registration_number}</dd>

                <dt className="col-sm-3">Expiry Date</dt>
                <dd className="col-sm-9">{company.ssm_expiry_date}</dd>

                <dt className="col-sm-3">MOF Status</dt>
                <dd className="col-sm-9">
                  {company.is_mof_active ? 
                 <span className="text-success">Active</span> 
                : 
                <span className="text-danger">Inactive</span>
                }
                </dd>

                <dt className="col-sm-3">MOF Certificate</dt>
                <dd className="col-sm-9">
                    { company.is_mof_cert_uploaded ? 
                    <button className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload MOF certifacate ( PDF )</span>
                    }
                </dd>

          
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
                type="text"
                placeholder="Enter MOF Registration Number"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Choose MOF Expiry Date"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>eProlehan Status ?</Form.Label>
              <Form.Check type="checkbox" label="Active" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload MOF Certificate</Form.Label>
              <Form.Control type="file" />
            </Form.Group>


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