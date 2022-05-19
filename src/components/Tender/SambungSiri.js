import React from 'react';
import apiClient from '../../services/api';
import Detail from './Detail';
import ErrorMsg from './ErrorMsg';
const collect = require('collect.js'); 


const TenderSambungSiri = () => {

    const [error,setError] = React.useState('')
    const [title,setTitle] = React.useState('')
    const [tenders, setTenders] = React.useState([]);
    const getTenderList = () => {

        // need to check user.company.is_approved = true
        apiClient.get('/api/tenders/sambung_siri')
        .then(response => {
            console.log(response.data)
            setTenders(response.data.tenders)
        })
        .catch(error => { 
            console.log('ada error')
            console.error(error.response.data)
            if (error.response.status === 422) {
                setTitle(error.response.data.title); 
                setError(error.response.data.message);
               
            } else {
                setTitle('Restricted area'); 
                setError('You don\'t have permission to enter this area.');
               
            }
        });
    }
    React.useEffect(() => getTenderList(), []); 

    const tenderList = tenders.map((tender) => 
        <Detail tender={tender} />
    );

    return (
        <>
        { error ? <ErrorMsg title={title} message={error} /> :
        <div>{tenderList}</div>
        }
        </>
    );
};

export default TenderSambungSiri;