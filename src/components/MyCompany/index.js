import React from 'react';
import ProfileData from './ProfileData';
import Profile from './ProfileForm';
import apiClient from '../../services/api';
import SsmData from './SsmData';
import MofData from './MofData';
import {Modal, Button} from 'react-bootstrap';
import FinasFPData from './FinasFPData';
import FinasFDData from './FinasFDData';
import KkmmData from './KkmmData';
import AuditData from './AuditData';
import BankData from './BankData';
import KkmmSwastaData from './KkmmSwasta';
import KkmmSyndicatedData from './KkmmSyndicated';
import BumiputeraData from './BumiputeraData';

 
const MyCompany = () => {

    return (
        <React.Fragment>
            <ProfileData/>
            <SsmData />
            <MofData />
            <FinasFPData />
            <FinasFDData />
            <KkmmSwastaData />
            <KkmmSyndicatedData />
            <BumiputeraData />
            <AuditData />

            {/* <KkmmData/>
            <AuditData />
             <BankData  />  */}
        </React.Fragment>
        
    );
};

export default MyCompany;

        
        