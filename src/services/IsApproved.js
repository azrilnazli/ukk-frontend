import React , { useState } from 'react';
import apiClient from './api';
import { Redirect } from 'react-router-dom';


const IsApproved = () =>  {
   
    const [redirect, setRedirect] = useState(true)
    const [status, setStatus] = useState('')

    const checkIsApproved = () => {
        setRedirect(false)
        apiClient.get('/api/company/check_approval_status')
        .then((response) => {
           // console.log(response.data.status)  
            if(response.data.status == 'approved'){ // approved
                setRedirect(false)
                setStatus(response.data.status)
                console.log('already set')

            } 
        })
        .catch((e) => {
            console.log(e.error);
            console.log("Error");
        });
    }
    console.log(status)
    React.useEffect(() => checkIsApproved(), []); 


 
    if (redirect === true) {
        return <Redirect to='/pages/restricted' />
    }

    return (
        <></>
    )
     
}

export default IsApproved;