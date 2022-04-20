import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = (
    {
        component: Component,
        loggedIn,
        ...rest
    }
) =>  ( 
    <Route 
        {...rest}
        render={ props => !loggedIn ? ( <Component {...props} /> ) :   <Redirect to="/home" /> }
    />
     ); // return</Route>
 
export default PublicRoute;