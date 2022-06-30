import React, { Fragment } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

const LoginLink = ({ logout, user }) => {

    return (

        <Fragment>
            <NavLink to='/login' className="nav-link"><i className="fa fa-user" aria-hidden="true"></i> Login</NavLink>
        </Fragment>

    );
};

export default LoginLink;
