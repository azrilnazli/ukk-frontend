import React from 'react';
import apiClient from '../../services/api';

const KkmmData = (company) => {

    return (
        <div className="card mt-3">
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start">K-KOM</span>

        <a  className=" btn btn-sm btn-primary m-1">Edit</a>
        
        </div>
        </h5>  
        
        <div className="card-body">
        <div>
            <dl className="row">
                <dt className="col-sm-3">K-KOM FP Registration ( FP )</dt>
                <dd className="col-sm-9">{company.kkmm_fp_registration_number}</dd>

                <dt className="col-sm-3">Expiry Date</dt>
                <dd className="col-sm-9">{company.kkmm_fp_expiry_date}</dd>

                <dt className="col-sm-3">K-KOM FP Certificate</dt>
                <dd className="col-sm-9">
                    { company.is_kkmm_fp_cert_uploaded ? 
                    <button className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload K-KOM FP Certiface</span>

                    }
                </dd>

                <dt className="col-sm-3">K-KOM FD Registration ( FP )</dt>
                <dd className="col-sm-9">{company.kkmm_fd_registration_number}</dd>

                <dt className="col-sm-3">Expiry Date</dt>
                <dd className="col-sm-9">{company.kkmm_fd_expiry_date}</dd>

                <dt className="col-sm-3">K-KOM FD Certificate</dt>
                <dd className="col-sm-9">
                    { company.is_kkmm_fd_cert_uploaded ? 
                    <button className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload K-KOM FD Certiface</span>

                    }
                </dd>

          
            </dl>
        </div>
        </div>
        </div>
    );
};

export default KkmmData

