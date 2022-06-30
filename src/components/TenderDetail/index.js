import React from 'react';
import { useParams } from "react-router-dom";
import GetTender from './GetTender';


const TenderDetail = () => {
    const { tender_detail_id } = useParams();

    console.log(tender_detail_id)
    return (
        <>
        <GetTender tender_detail_id={tender_detail_id} />
        </>
    );
};

export default TenderDetail;