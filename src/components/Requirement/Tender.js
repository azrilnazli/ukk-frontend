import React from 'react';
import apiClient from '../../services/api';
import { Button, Navbar, NavbarBrand, Container,Nav,NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router,Link,NavLink  } from 'react-router-dom';

import config from '../../config.json';

import RequestForApproval from './RequestForApproval';
import GetApprovalStatus from './GetApprovalStatus';
import CheckCompanyModule from './CheckCompanyModule';
import AllowRequestButton from './AllowRequestButton';
import GetComment from './GetComment';

const Tender = () => {

    // load TenderDetail from BE Server
    const [error,setError] = React.useState('')
    const [title,setTitle] = React.useState('')
    const [tenders, setTenders] = React.useState([])
    const [isPending, setIspending] = React.useState(true)
    const [isSubmit, setIsSubmit] = React.useState(false)
  
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
    React.useEffect(() => getTenderDetailList(), [isSubmit]); 

    const tenderList = tenders.map((tender) => 
       
        <>
            <div key={tender.id} className='container container-fluid bg-light rounded p-3 mt-2'>
                <div className='row'>
                    <div className='col-md-6'>

                        <div className='row'>
                            <div className='col-md-4'>
                                <div className="alert alert-secondary" role="alert">
                                    <strong>Tender Name</strong> : <span className="badge bg-dark"> {tender.title}</span> 
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="alert alert-secondary" role="alert">
                                    <strong>Expired in</strong> 
                                    &nbsp;
                                    : 
                                    &nbsp;
                                    <small><span className="badge bg-dark">{tender.expired}</span></small>
                                </div>                                
                            </div>
                            <div className='col-md-4'>
                                <div className="alert alert-secondary" role="alert">
                                    <strong>Max proposal</strong> : <span className="badge bg-dark">{tender.max}</span>
                                </div>                               
                            </div>
                        </div>
        
                        
                        <GetComment tender_detail_id={tender.id} />
                 
                        <div className="alert alert-secondary" role="alert">
                            {tender.description}    
                        </div>
                        

                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="alert alert-secondary" role="alert">
                                    <strong>Status</strong> 
                                    &nbsp;
                                    : 
                                    &nbsp;
                                    <GetApprovalStatus 
                                        tender_detail_id={tender.id}  
                                        isSubmit={isSubmit}
                                    
                                    /> 
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="alert alert-secondary" role="alert">
                                    <strong><small>Request for Approval</small></strong> 
                                    &nbsp;
                                    : 
                                    &nbsp;
                                    <span className='ms-2'>
                                        <AllowRequestButton 
                                            tender_detail_id={tender.id} 
                                            setIsSubmit={setIsSubmit}
                                           
                                        />
                                    </span>
                                </div>                                
                            </div>
                        </div> 
                        <div className='row'>
                            <div className='col'>
                                <div className="alert alert-success" role="alert">
                                    <div className='row'>
                                        <div className='col-6'>
                                        Your application has been approved. Now you can browse 
                                        all the available tenders. Please click botton on the right.
                                        </div>
                                        <div className='col-6 d-lg-flex justify-content-center align-items-center'>
                                        <Link to={`/tender_details/${tender.id}`} className="btn btn-primary">
                                            Browse Tender <span className='ms-2 badge bg-light text-dark'>16</span>
                                        </Link>
                                        </div>
                       
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>
               
                    <div className='col-md-6'>
             
                            <ul className='list-group '>
                           
                                {tender.tender_requirements.map((requirement) =>
                                    <>
                                        <CheckCompanyModule 
                                            module={ requirement.module } 
                                            title={ requirement.title }
                                        />
                                    </>
                                )}
                            </ul> 
                         
                    </div>

                </div>
            </div>
        </>
    );
    
    return (
        isPending ?
        <div className='container container-fluid bg-light rounded p-3 mt-2'>
            <span>loading...</span>
        </div>
        :
        <>
        {tenderList}
        </>
    );
};

export default Tender;