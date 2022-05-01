import React from 'react';
import apiClient from '../../services/api';
import { Redirect } from 'react-router-dom';
import UserData from '../Widgets/UserData';
import CheckData from '../MyCompany/CheckData';
import RequestForApproval from '../MyCompany/RequestForApproval';

const Dashboard = () => {

    
    return (

    <div className='container container-fluid bg-light rounded p-3'>



      <div className="alert alert-warning text-danger" role="alert">
      <i className="fa fa-exclamation-triangle"></i> System is still under development.
      </div>

    <div className="row align-items-start pe-3">

      <div className="col-6">
        <img src="/img/requirements.jpg" className="img-fluid rounded" />
        
      </div>

      <div className="col-6">

        <div className='row mt-3'>

          <div className="alert alert-primary" role="alert">
          You've submitted for Approval to UKK.
          </div>


          <div className="card border-primary">
   
            <div className="card-body">
              
              <p className="card-text">Please complete all the required fields before you're able to apply for approval.
              Please check the minimal requirements for submission.</p>
              <ul className='list-group'>
                  <CheckData module="check_profile" title="Profile" />
                  <CheckData module="check_board_of_directors" title="Board Of Directors" />
                  <CheckData module="check_experiences" title="Experiences" />

                  <CheckData module="check_ssm" title="SSM" />
                  <CheckData module="check_mof" title="MOF" />

                  <CheckData module="check_finas_fp" title="FINAS (PF)" />
                  <CheckData module="check_finas_fd" title="FINAS (DF)" />

                  <CheckData module="check_kkmm_swasta" title="KKMM ( Swasta )" />
                  <CheckData module="check_kkmm_syndicated" title="KKMM ( Syndicated )" />
                
                  <CheckData module="check_bumiputera" title="Bumiputera Status" />
                  <CheckData module="check_bank" title="Banking Informations" />
                  <CheckData module="check_credit" title="Credit Facilities" />
              </ul>
              <RequestForApproval />
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className="card border-primary">
 
            <div className="card-body">
              <h5 className="card-title">Status</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>


      </div>
  </div>



      

    </div>
    );
};

export default Dashboard;
