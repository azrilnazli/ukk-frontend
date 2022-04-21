import React from 'react';

const ProfileData = () => {
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
                <dd className="col-sm-9">VireServe SDN BHD</dd>

                <dt className="col-sm-3">Email</dt>
                <dd className="col-sm-9">contact@vireserve.com</dd>

                <dt className="col-sm-3">Phone</dt>
                <dd className="col-sm-9">013-8888 8888</dd>

                <dt className="col-sm-3">Address</dt>
                <dd className="col-sm-9">No 1 Jalan Gemilang</dd>

                <dt className="col-sm-3">Postcode</dt>
                <dd className="col-sm-9">43900</dd>

                <dt className="col-sm-3">City</dt>
                <dd className="col-sm-9">Petaling Jaya</dd>

                <dt className="col-sm-3">State</dt>
                <dd className="col-sm-9">Selangor</dd>
          
            </dl>
        </div>
        </div>
        </div>
    );
};

export default ProfileData;