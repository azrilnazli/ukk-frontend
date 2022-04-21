import React from 'react';
import apiClient from '../../services/api';

const MofData = (company) => {

    return (
        <div className="card mt-3">
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start"> Ministry of Finance</span>

        <a  className=" btn btn-sm btn-primary m-1">Edit</a>
        
        </div>
        </h5>  
        
        <div className="card-body">
        <div>
            <dl className="row">
                <dt className="col-sm-3">MOF Registration</dt>
                <dd className="col-sm-9">{company.cert_mof}</dd>

                <dt className="col-sm-3">MOF Status</dt>
                <dd className="col-sm-9">{company.is_eprolehan_active}</dd>

                <dt className="col-sm-3">MOF Certificate</dt>
                <dd className="col-sm-9"><button className='btn btn-primary'>View</button></dd>

          
            </dl>
        </div>
        </div>
        </div>
    );
};

export default MofData;