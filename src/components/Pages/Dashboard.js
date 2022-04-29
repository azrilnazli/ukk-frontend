import React from 'react';
import apiClient from '../../services/api';
import { Redirect } from 'react-router-dom';
import UserData from '../Widgets/UserData';

const Dashboard = () => {


  const [isPending, SetIsPending] = React.useState(false)
  const [profile,setProfile] = React.useState(false)  

  React.useEffect(() => {

    apiClient.get('/api/company/check_profile')
    .then(response => {
        setProfile(response.data.status)
        SetIsPending(true)
    })
    .catch(error => console.error(error));
        
    }, []);

    console.log(profile)
    
    return (

    <div className='container container-fluid bg-light rounded p-3'>

      <div className="alert alert-warning text-danger" role="alert">
      <i className="fa fa-exclamation-triangle"></i> System is still under development.
      </div>

      <div className="alert alert-success" role="alert">
      <h4>Your company info</h4>

      { isPending ? 
        <ul>
          <li>
            
            {profile ? 
            <>
            <span className="text-primary">Company Profile </span>
            <span className="badge rounded-pill bg-success"><i className="fa fa-check"></i></span> 
            </>
            :
            <>
            <span className="text-danger">Company Profile </span>
            <span className="badge rounded-pill bg-danger"><i className="fa fa-times"></i></span>  
            </>
            }
            </li>
        </ul>
        :
        <p>Loading data ...</p>
          }
      </div>
      <button className='btn btn-primary disabled'>Submit for Approval</button>

    </div>
    );
};

export default Dashboard;
