import React from 'react';
//import apiClient from '../../services/api';
//import { Redirect } from 'react-router-dom';
//import UserData from '../Widgets/UserData';
import CheckData from '../MyCompany/CheckData';
import RequestForApproval from '../MyCompany/RequestForApproval';
import ApprovalStatus from '../MyCompany/ApprovalStatus';
import Comment from '../MyCompany/Comment';

const Dashboard = () => {

    
    return (

    <div className='container container-fluid bg-light rounded p-3'>



      {/* <div className="alert alert-warning text-danger" role="alert">
      <i className="fa fa-exclamation-triangle"></i> System is still under development.
      </div> */}

    <div className="row align-items-start pe-3">

      <div className="col-6">
        {/* <img src="/img/requirements.jpg" className="img-fluid rounded" /> */}
          <div className="alert alert-primary" role="alert">
          <i className='fas fa-exclamation-triangle' style={{color: 'red'}}></i> Please install Adobe Acrobat Reader.
          </div>
          <div className='row'>
            <ApprovalStatus />
          </div>
          <div className='row'>
            <Comment />
          </div>


      </div>

      <div className="col-6">
        <div className='row'>

{/* 
          <div className="alert alert-primary" role="alert">
          New message from UKK.
          </div>
          <div className="alert alert-primary" role="alert">
          You've submitted for Approval to UKK.
          </div> */}

          <div className="card border-light">
   
            <div className="card-body">
              
              <h5 className="card-title">Company Profile</h5>
              <p className="card-text">Please complete all the required fields before you're able to apply for approval.
              Please check the minimal requirements for submission.</p>
              <ul className='list-group mb-3'>
                  <CheckData module="check_profile" title="Profile" />
                  <CheckData module="check_board_of_directors" title="Board Of Directors" />
                  <CheckData module="check_experiences" title="Experiences" />

                  <CheckData module="check_ssm" title="SSM" />
                  <CheckData module="check_mof" title="MOF" />

                  <CheckData module="check_finas_fp" title="FINAS (PF)" />
                  {/* <CheckData module="check_finas_fd" title="FINAS (DF)" /> */}

                  <CheckData module="check_kkmm_swasta" title="KKMM ( Swasta )" />
                  {/* <CheckData module="check_kkmm_syndicated" title="KKMM ( Syndicated )" /> */}
                
                  {/* <CheckData module="check_bumiputera" title="Bumiputera Status" /> */}
                  <CheckData module="check_audit" title="Audit Informations" />
                  <CheckData module="check_bank" title="Banking Informations" />
                  {/* <CheckData module="check_credit" title="Credit Facilities" /> */}
              </ul>
              <div className="d-flex justify-content-end">
                <RequestForApproval />
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>



      

    </div>
    );
};

export default Dashboard;
