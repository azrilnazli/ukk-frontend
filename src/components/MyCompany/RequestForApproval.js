import React from 'react';
import apiClient from '../../services/api';


const RequestForApproval = () => {

    const collect = require('collect.js'); 
    const [isCompleted,setIsCompleted] = React.useState(0)
    const [isCompletedError,setIsCompletedError] = React.useState(0)

    React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/company/check_is_completed', { signal: abortCont.signal} )
        .then(response => {
            //console.log(response)
            setIsCompleted(response.data.status)
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render


    const handleSubmit = (e) => {
   
        // JS formData
        const formData = new FormData();
        formData.append('is_completed', '1'); // force the filename on server

    
        // axios 
        apiClient({
            method: "post",
            url: "/api/company/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(response => {
            setIsCompleted(1)
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
            { isCompleted === 0 ?
            <button onClick={handleSubmit} className='btn btn-primary'>Request for Approval</button>
            :
            <button disabled className='btn btn-secondary'>Waiting for Approval</button>
            }
        </div>
    );
};

export default RequestForApproval;