import React from 'react';
import apiClient from '../../services/api';

const BankData = (company) => {

    return (
        <div className="card mt-3">
        <h5 className="card-header">          
        <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
        <span className="float-start">Bank Informations</span>

        <a  className=" btn btn-sm btn-primary m-1">Edit</a>
        
        </div>
        </h5>  
        
        <div className="card-body">
        <div>
            <dl className="row">
                <dt className="col-sm-3">Bank Name</dt>
                <dd className="col-sm-9">{company.bank_name}</dd>


                <dt className="col-sm-3">Bank Branch</dt>
                <dd className="col-sm-9">{company.bank_branch}</dd>

                <dt className="col-sm-3">Bank Account Number</dt>
                <dd className="col-sm-9">{company.bank_account_number}</dd>

                <dt className="col-sm-3">Bank Statement Start Date</dt>
                <dd className="col-sm-9">{company.bank_statement_date_start}</dd>

                <dt className="col-sm-3">Bank Statement End Date</dt>
                <dd className="col-sm-9">{company.bank_statement_date_end}</dd>



                <dt className="col-sm-3">Bank Statement</dt>
                <dd className="col-sm-9">
                    { company.is_bank_cert_uploaded ? 
                    <button className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload Bank Statement</span>

                    }
                </dd>

                

                <dt className="col-sm-3">Credit Facility</dt>
                <dd className="col-sm-9">
                    { company.is_credit_cert_uploaded ? 
                    <button className='btn btn-primary btn-sm'>View Document</button>
                    :
                    <span className="text-danger">Please upload Credit Facility</span>

                    }
                </dd>
            </dl>
        </div>
        </div>
        </div>
    );
};

export default BankData;