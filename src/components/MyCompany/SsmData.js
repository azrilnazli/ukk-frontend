import React from 'react';
import apiClient from '../../services/api';

const SsmData = (company) => {

    return (
        <div className="card mt-3">
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start"> Suruhanjaya Syarikat Malaysia</span>

        <a  className=" btn btn-sm btn-primary m-1">Edit</a>
        
        </div>
        </h5>  
        
        <div className="card-body">
        <div>
            <dl className="row">
                <dt className="col-sm-3">SSM Registration</dt>
                <dd className="col-sm-9">{company.ssm_registration_number}</dd>

                <dt className="col-sm-3">Expiry Date</dt>
                <dd className="col-sm-9">{company.ssm_expiry_date}</dd>

                <dt className="col-sm-3">SSM Certificate</dt>
                <dd className="col-sm-9">
                    { company.is_ssm_cert_uploaded ? 
                    <button className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload SSM Certiface</span>

                    }
                </dd>
            </dl>
        </div>
        </div>
        </div>
    );
};

export default SsmData;