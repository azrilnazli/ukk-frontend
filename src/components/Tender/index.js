import React from 'react';
import ErrorMsg from './ErrorMsg';
import GetTender from './GetTender';

const TenderDetail = () => {

    return (
        <>
        <ErrorMsg title="test" message="error message" />
        <GetTender tender_detail_id='3' />
        </>
     
    );
};

export default TenderDetail;