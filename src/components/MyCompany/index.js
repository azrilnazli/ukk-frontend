import React from 'react';
import ProfileData from './ProfileData';
import Profile from './ProfileForm';
import apiClient from '../../services/api';
import SsmData from './SsmData';
import MofData from './MofData';
import {Modal, Button} from 'react-bootstrap';
import FinasData from './FinasData';
import KkmmData from './KkmmData';
import AuditData from './AuditData';
import BankData from './BankData';
 
const MyCompany = () => {

   

    const [show, setShow] = React.useState(false);

    const [company, setCompany] = React.useState({})

    React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/company/show_profile', { signal: abortCont.signal} )
        .then(response => {
            console.log(response.data.data.name)
            setCompany(response.data.data)
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render
  
    return (
        <React.Fragment>
            <ProfileData {...company} />
            <SsmData {...company} />
            <MofData {...company} />
            <FinasData {...company} />
            <KkmmData {...company} />
            <AuditData {...company} />
            <BankData {...company} />
     
 
        </React.Fragment>
        
    );
};

export default MyCompany;

        
        