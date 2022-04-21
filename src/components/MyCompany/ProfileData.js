import React from 'react';
import apiClient from '../../services/api';

const ProfileData = (company) => {




    return (
        <div className="card mt-3">
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start"> Company Profile</span>

        <a  className=" btn btn-sm btn-primary m-1">Edit</a>
        
        </div>
        </h5>  
        
        <div className="card-body">
        <div>
            <dl className="row">
                <dt className="col-sm-3">Name</dt>
                <dd className="col-sm-9">{company.name}</dd>

                <dt className="col-sm-3">Email</dt>
                <dd className="col-sm-9">{company.email}</dd>

                <dt className="col-sm-3">Phone</dt>
                <dd className="col-sm-9">{company.phone}</dd>

                <dt className="col-sm-3">Address</dt>
                <dd className="col-sm-9">{company.address}</dd>

                <dt className="col-sm-3">Postcode</dt>
                <dd className="col-sm-9">{company.postcode}</dd>

                <dt className="col-sm-3">City</dt>
                <dd className="col-sm-9">{company.city}</dd>

                <dt className="col-sm-3">State</dt>
                <dd className="col-sm-9">{company.states}</dd>
          
            </dl>
        </div>
        </div>
        </div>
    );
};

export default ProfileData;