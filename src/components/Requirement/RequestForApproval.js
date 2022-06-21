import React from 'react';
import apiClient from '../../services/api';
import AllowRequest from './AllowRequest';

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
        <span className='ms-2'>
            <AllowRequest 
                handleSubmit={handleSubmit}
                tender_detail_id={props.tender_detail_id} 
            />
        </span>
    );
};

export default RequestForApproval;