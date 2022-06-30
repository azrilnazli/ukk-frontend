import React from 'react';
import ProfileData from './ProfileData';
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
import CreditData from './CreditData';
import BoardOfDirectors from './BoardOfDirectorsData';
import ExperiencesData from './ExperiencesData';
import AuthorizationLetterData from './AuthorizationLetterData';
import OfficialCompanyLetterData from './OfficialCompanyLetterData';

 
const MyCompany = () => {

    return (
        <React.Fragment>
            <div className="alert alert-primary" role="alert">
                <i className='fa fa-info-circle'></i> Please fill up the form. Document must be in PDF format.
            </div>
            <ProfileData/>
            <BoardOfDirectors />
            <ExperiencesData />
            <SsmData />
            <MofData />
            <FinasFPData />
            <FinasFDData />
            <KkmmSwastaData />
            <KkmmSyndicatedData />
            <BumiputeraData />
            <AuditData />
            <BankData  /> 
            <CreditData />
            <AuthorizationLetterData />
            <OfficialCompanyLetterData />

        </React.Fragment>
        
    );
};

export default MyCompany;

        
        