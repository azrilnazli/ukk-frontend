import React from 'react';
import apiClient from '../../services/api';


const RequestForApproval = () => {

    const collect = require('collect.js'); 

    const [status, setStatus] = React.useState('')
    const [allowRequest,setAllowRequest] = React.useState(false)
    const [isCompleted,setIsCompleted] = React.useState(false)
    const [isCompletedError,setIsCompletedError] = React.useState(0)

    // to check is_completed status
    React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/company/check_for_approval', { signal: abortCont.signal} )
        .then(response => {
            console.log(response.data.is_completed) 
            setAllowRequest(response.data.status) // check if vendor completed the required form
            setIsCompleted(response.data.is_completed) // server should return is_completed for first time submission
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render


    const handleSubmit = (e) => {
   
        // JS formData
        const formData = new FormData();
        formData.append('is_completed', true); // force the filename on server

        // axios 
        apiClient({
            method: "post",
            url: "/api/company/request_for_approval",
            data: formData,
        }).then(response => {
            console.log(response.data.status)
            setIsCompleted(response.data.status) // true or false
        }).catch(error => {

          if (error.response.status === 422) {
    
            // validation error
            const errors = collect(error.response.data.errors); 
            console.log(errors)
            errors.each( (error,field) => {
                setIsCompletedError(error)
            })
          }
        })  
    }


    return (
        <div className='mt-2'>

        { allowRequest == true ?
            <> 
                { !isCompleted == true ?
                <button  onClick={handleSubmit} className='btn btn-primary'>Request for Approval</button>
                :
                <button className='btn btn-secondary'>Already requested</button>
                }
            </>
            :
            <button  disabled className='btn btn-primary'>Request for Approval</button>
        }

        </div>
    );
};

export default RequestForApproval;