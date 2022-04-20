import React from 'react';
import apiClient from '../../services/api';
import { Redirect } from 'react-router-dom';
import UserData from './UserData';

const LogoutLink = ({ logout, user }) => {

    return (

        <>
        <a href="#" onClick={logout} className="dropdown-item">
            <i className="fa fa-share-square" aria-hidden="true"></i> 
            Logout ( {user ? user : sessionStorage.getItem('username') } )  
        </a>
        </>

    );
};

export default LogoutLink;
