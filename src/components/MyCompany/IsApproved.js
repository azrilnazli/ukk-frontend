import React from 'react';
import apiClient from '../../services/api';

const ApprovalStatus = () => {

    const [isApproved,setIsApproved] = React.useState()
    const [isPending, setIsPending] = React.useState(true)

    React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/company/check_approval_status', { signal: abortCont.signal} )
        .then(response => {
            console.log(response.data.status)
            setIsPending(false)
            setIsApproved(response.data.status)
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render

    return (
    <>
        {/* {!isPending ? <span className="badge bg-primary text-uppercase">{isApproved ? isApproved : 'Not submitted'}</span> : 'checking ...'} */}

        {(() => {
            switch (isApproved) {
              case 'approved':
                return  <span className="badge bg-success text-uppercase">{isApproved}</span>
              case 'rejected':
                return <span className="badge bg-danger text-uppercase">{isApproved}</span>
              case 'pending':
                return <span className="badge bg-info text-uppercase">{isApproved}</span>
     
              default:
                return null
            }
          })()}
    </>
    );
};

export default ApprovalStatus;