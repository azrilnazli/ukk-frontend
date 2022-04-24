import React from 'react';
import apiClient from '../../services/api';

const FinasData = (company) => {

    return (
        <div className="card mt-3">
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start">FINAS</span>

        <a  className=" btn btn-sm btn-primary m-1">Edit</a>
        
        </div>
        </h5>  
        
        <div className="card-body">
        <div>
            <dl className="row">
                <dt className="col-sm-3">Finas FP Registration ( FP )</dt>
                <dd className="col-sm-9">{company.finas_fp_registration_number}</dd>

                <dt className="col-sm-3">Expiry Date</dt>
                <dd className="col-sm-9">{company.finas_fp_expiry_date}</dd>

                <dt className="col-sm-3">Finas FP Certificate</dt>
                <dd className="col-sm-9">
                    { company.is_finas_fp_cert_uploaded ? 
                    <button className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload FINAS FP Certiface</span>

                    }
                </dd>

                <dt className="col-sm-3">Finas FD Registration ( FP )</dt>
                <dd className="col-sm-9">{company.finas_fd_registration_number}</dd>

                <dt className="col-sm-3">Expiry Date</dt>
                <dd className="col-sm-9">{company.finas_fd_expiry_date}</dd>

                <dt className="col-sm-3">Finas FD Certificate</dt>
                <dd className="col-sm-9">
                    { company.is_finas_fd_cert_uploaded ? 
                    <button className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span>Please upload FINAS FD Certiface</span>

                    }
                </dd>

          
            </dl>
        </div>
        </div>
        </div>
    );
};

export default FinasData

