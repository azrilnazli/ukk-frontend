import React from 'react';
import apiClient from '../../services/api';
import Detail from './Detail';
import IsApproved from '../../services/IsApproved';
import ErrorMsg from './ErrorMsg';
const collect = require('collect.js'); 


const GetTender = ({type}) => {

    const [error,setError] = React.useState('')
    const [title,setTitle] = React.useState('')
    const [tenders, setTenders] = React.useState([])
    const [isPending, setIspending] = React.useState(true)

    const getTenderList = () => {
        apiClient.get('/api/tenders/' + type + '/get_tenders') 
        .then(response => {
           // console.log(response.data)
            setIspending(false)
            setTenders(response.data.tenders)
        })
        .catch(error => { 
            setIspending(false)
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
    
        <Detail key={tender.id} tender={tender} />
    );

    if(error){
        return (<><ErrorMsg title={title} message={error} /></>)
    } else {
        return (
            <>
            {isPending ? <div className='container container-fluid bg-light rounded p-3 bg-light'> loading...</div>
            :
                <>{tenderList}</>
            }
            </>
        );
    }
};

export default GetTender;