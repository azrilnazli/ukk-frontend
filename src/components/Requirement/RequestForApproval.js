import React from 'react';
import apiClient from '../../services/api';
import AllowRequestButton from './AllowRequestButton';

const RequestForApproval = (props) => {

    return (
        <span className='ms-2'>
            <AllowRequestButton
                tender_detail_id={props.tender_detail_id} 
            />
        </span>
    );
};

export default RequestForApproval;