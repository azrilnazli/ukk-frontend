import React from 'react';
import apiClient from '../../services/api';
import { Redirect } from 'react-router-dom';

const Welcome = (props) => {



        return (
            <div className='container container-fluid bg-light rounded p-3'>           
                <div className="ratio ratio-1x1">
                        <iframe className="embed-responsive-item" src="/pdf/syarat.pdf"></iframe>
                </div>
            </div>
        );
  
};

export default Welcome;
