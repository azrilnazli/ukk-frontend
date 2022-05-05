import React from 'react';
import apiClient from '../../services/api';
import RequestForApproval from './RequestForApproval';

const ApprovalStatus = () => {

    const [isCompleted,setIsCompleted] = React.useState()
    const [isCompletedError,setIsCompletedError] = React.useState()

    React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/company/check_is_completed', { signal: abortCont.signal} )
        .then(response => {
            console.log(response.data.status)
            setIsCompleted(response.data.status)
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render

    return (
    <>
    { isCompleted ?
    <div className='row mt-0 ms-1'>
        <div className="card border-success">
          <div className="card-body">
            <h5 className="card-title">Request for Approval</h5>
            <p className="card-text">

            {isCompleted ? 'Submitted for approval' : 'Not submitted yet'}

            </p>
          </div>
        </div>
    </div>
    :
    <div className='row mt-0 ms-1'>
    <div className="card border-primary">
      <div className="card-body">

        <h5 className="card-title">Request for Approval</h5>
        <div class="d-flex justify-content-between">
        <div className="card-text">Make sure all the required documents were completed before requesting.</div>
        <RequestForApproval />
        </div>
      </div>
    </div>
</div>
    }
    </>
    );
};

export default ApprovalStatus;