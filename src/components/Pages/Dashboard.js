import React from 'react';
import apiClient from '../../services/api';
import { Redirect } from 'react-router-dom';
import UserData from '../Widgets/UserData';
import CheckData from '../MyCompany/CheckData';

const Dashboard = () => {

    
    return (

    <div className='container container-fluid bg-light rounded p-3'>



      <div className="alert alert-warning text-danger" role="alert">
      <i className="fa fa-exclamation-triangle"></i> System is still under development.
      </div>

      <div className="row align-items-start">

    <div className="col-6">
    <img src="/img/requirements.jpg" className="img-fluid rounded" />
    </div>
    <div className="col-6">

      <div className='row '>
    <h4>Current Progress</h4>
   
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
      <button className='btn btn-primary disabled col-6 mt-2'>Submit for Approval</button>
      
      </div>
    </div>
  </div>



      

    </div>
    );
};

export default Dashboard;
