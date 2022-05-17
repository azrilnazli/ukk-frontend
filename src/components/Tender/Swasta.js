import React from 'react';
import apiClient from '../../services/api';
import Detail from './Detail';
import IsApproved from '../../services/IsApproved';
const collect = require('collect.js'); 


const TenderSwasta = () => {

    
    const [tenders, setTenders] = React.useState([]);
    const getTenderList = () => {
        apiClient.get('/api/tenders/swasta')
        .then(response => {
           // console.log(response.data)
            setTenders(response.data.tenders)
        })
        .catch(error => console.error(error));
    }
    React.useEffect(() => getTenderList(), []); 

    const tenderList = tenders.map((tender) => 
        <Detail tender={tender} />
    );

    return (
    
        <div>{tenderList}</div>
    );
};

export default TenderSwasta;