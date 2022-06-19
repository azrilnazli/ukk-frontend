import React from 'react';
import apiClient from '../../services/api';
import { Button, Navbar, NavbarBrand, Container,Nav,NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router,Link,NavLink  } from 'react-router-dom';
import CheckData from '../MyCompany/CheckData';
import config from '../../config.json';

const Tender = () => {

    // load TenderDetail from BE Server
    const [error,setError] = React.useState('')
    const [title,setTitle] = React.useState('')
    const [tenders, setTenders] = React.useState([])
    const [isPending, setIspending] = React.useState(true)

    
    const getTenderDetailList = () => {
        apiClient.get('/api/tender-details') 
        .then(response => {
            console.log(response.data)
            setIspending(false)
            setTenders(response.data.tenders)
        })
        .catch(error => { 
            setIspending(false)
            console.error(error.response.data)
   
        });
    }
    React.useEffect(() => getTenderDetailList(), []); 

    const tenderList = tenders.map((tender) => 
       
        <>
            <div key={tender.id} className='container container-fluid bg-light rounded p-3 mt-2'>
                <div className='row'>
                    <h5>{tender.title}</h5>
                </div>
                <div className='row'>
                    <p><strong>Max proposal</strong> : {tender.max}</p>
                </div>
                <div className='row'>
                    <div className='col-md-6'>{tender.description}</div>
               
                    <div className='col-md-6'>
             
                          
                            <ul className='list-group '>
                                {tender.tender_requirements.map((requirement) =>
                                    <>
                                    <CheckData module={ requirement.module } title={ requirement.title } />
                                    </>
                                )}
                            </ul> 
                         
                      
                    </div>

                </div>
                <div className='row'>
                    <h5>Date Range : <strong>{tender.start} -  {tender.end}</strong></h5>
                </div>
            </div>
        </>
    );
    
    return (
        <>
        {tenderList}
        </>
    );
};

export default Tender;