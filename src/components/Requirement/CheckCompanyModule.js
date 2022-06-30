import React from 'react';
import apiClient from '../../services/api';
import { Redirect } from 'react-router-dom';
import UserData from '../Widgets/UserData';

const CheckCompanyModule = (props) => {


  const [isPending, setIsPending] = React.useState(false)
  const [profile,setProfile] = React.useState(false)  

  React.useEffect(() => {

    apiClient.get('/api/company-approvals/check-for-approval/' + props.module)
    .then(response => {
        //console.log(response)
        setProfile(response.data.status) // true or false
        setIsPending(true)
    })
    .catch(error => console.error(error));
        
    }, []);

    //console.log(profile)
    
    return (

    <>
      { isPending ? 
        
            <li  className="list-group-item d-flex justify-content-between align-items-center">
                {profile ? 
                <>
                <span className="text-primary">{props.title} </span>
                <span className="badge rounded-pill bg-success"><i className="fa fa-check"></i></span> 
                </>
                :
                <>
                <span className="text-danger">{props.title} </span>
                <span className="badge rounded-pill bg-danger"><i className="fa fa-times"></i></span>  
                </>
                }
            </li>      
        :
            <li className="list-group-item d-flex justify-content-between align-items-center">Checking ...</li>
        }
    </>

    );
};

export default CheckCompanyModule;