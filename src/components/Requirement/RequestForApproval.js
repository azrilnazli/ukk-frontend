import React from 'react';
import apiClient from '../../services/api';

const RequestForApproval = (props) => {

    const handleSubmit = (e) => {
        // formData
        const formData = new FormData();
        formData.append('tender_detail_id', props.tender_detail_id); 

        // axios 
        apiClient({
            method: "post",
            url: "/api/company-approvals/request-for-approval",
            data: formData,
        }).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })  
    }

    return (
        <button onClick={handleSubmit} className='btn btn-primary btn-sm'>Submit</button>
    );
};

export default RequestForApproval;