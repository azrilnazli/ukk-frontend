import React from 'react';
import apiClient from '../../services/api';

const AuditData = (company) => {

    return (
        <div className="card mt-3">
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start">Company Audit</span>

        <a  className=" btn btn-sm btn-primary m-1">Edit</a>
        
        </div>
        </h5>  
        
        <div className="card-body">
        <div>
            <dl className="row">
                <dt className="col-sm-3">Current Audit Year</dt>
                <dd className="col-sm-9">{company.current_audit_year}</dd>

                <dt className="col-sm-3">Audit Certificate</dt>
                <dd className="col-sm-9">
                    { company.is_current_audit_year_cert_uploaded ? 
                    <button className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload Audit Certiface</span>

                    }
                </dd>
            </dl>
        </div>
        </div>
        </div>
    );
};

export default AuditData;