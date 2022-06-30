import React from 'react';
import { useParams } from "react-router-dom";
import apiClient from '../../services/api';
import TenderDetails from './TenderDetails';
import EditFormTypeB from './EditFormTypeB';
const collect = require('collect.js'); 

const CreateTender = () => {
    
    const { tender_id } = useParams();
    const { tender_submission_id } = useParams();
    const [tender, setTender] = React.useState([]);

    
    const getTenderDetail = () => {

        // get Tender detail
        apiClient.get('/api/tender/' + tender_id)
        .then(response => {
            //console.log(response)
            setTender(response.data.tender)
        })
        .catch(error => console.error(error));
    }
    React.useEffect(() => getTenderDetail(), []); 

    return (
        <>
      
        <div className='container container-fluid bg-light rounded p-3 col-md-12'>
            <TenderDetails tender={tender} />   
        </div>

        
        <EditFormTypeB tender_id={tender_submission_id} />
     
        </>
    );
};

export default CreateTender;