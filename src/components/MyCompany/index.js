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

    return (
        <React.Fragment>
            <ProfileData/>
            {/* <SsmData {...company} />  */}
            <MofData />
            {/* <FinasData {...company} />
            <KkmmData {...company} />
            <AuditData {...company} />
            <BankData {...company} /> */}
        </React.Fragment>
        
    );
};

export default MyCompany;

        
        