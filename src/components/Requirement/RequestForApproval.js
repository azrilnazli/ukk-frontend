import React from 'react';
import apiClient from '../../services/api';
import AllowRequestButton from './AllowRequestButton';

const RequestForApproval = (props) => {

    return (
        <span>
            <AllowRequestButton
                tender_detail_id={props.tender_detail_id} 
                setIsSubmit={props.setIsSubmit}
            />
        </span>
    );
};

export default RequestForApproval;