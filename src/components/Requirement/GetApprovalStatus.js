import React from 'react';
import apiClient from '../../services/api';

const GetApprovalStatus = (props) => {

    const [isPending,setIspending] = React.useState(true)
    const [approvalStatus,setApprovalStatus] = React.useState('')

    const getData = () => {
        apiClient.get('/api/company-approvals/get-approval-status/' + props.tender_detail_id ) 
        .then(response => {
            console.log(response.data)
            setIspending(false)
            setApprovalStatus(response.data.status)
  
        })
        .catch(error => { 
            setIspending(false)
            console.error(error.response.data)

        });
    }
    React.useEffect(() => getData(), [props.isSubmit]); 

    return (
        isPending ? <span>Loading...</span> : <span className="badge bg-dark text-uppercase">{approvalStatus}</span>
    )
}

export default GetApprovalStatus;