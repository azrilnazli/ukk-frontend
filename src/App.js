import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import apiClient from './services/api';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import Welcome from './components/Pages/Welcome';
import Dashboard from './components/Pages/Dashboard';
import LoginForm from './components/LoginForm';

import LogoutLink from './components/Widgets/LogoutLink';
import LoginLink from './components/Widgets/LoginLink';

import RegisterForm from './components/RegisterForm';
import PasswordEmail from './components/Password/email';
import PasswordReset from './components/Password/reset';
import Movies from './components/Movies/index';
import MoviePlay from './components/Movies/MoviePlay';
import Navbar from './components/Widgets/Navbar';
import MyAccount from './components/MyAccount';
import MyCompany from './components/MyCompany';
import Faq from './components/Pages/Faq';
import MyProposal from './components/MyProposal';
import Reducer from './components/Pages/Reducer';
import Password from './components/MyAccount/Password';



const App = () => {

  const [user, setUser] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };

  const logout = () => {
    apiClient.post('/api/auth/logout').then(response => {
      if (response.status === 200) {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
        sessionStorage.setItem('userObject', false);
      }
    })
  };

  const authLink = loggedIn 
  ? null 
  : <LoginLink />

  return (
    
    <Router>
      <div className="container mt-1 mb-2 py-3 bg-primary">
        <Navbar  NavLink={NavLink} logout={logout} loggedIn={loggedIn}  authLink={authLink}/>        
        <div className="container mt-1 mb-2 py-3 bg-primary">
        
          <Switch>

              {/* Public eg guest */}
              <PublicRoute path='/' exact  component={Welcome} />
              <PublicRoute path='/home' exact  component={Welcome} />
              <PublicRoute path='/register' component={RegisterForm} />
              <PublicRoute path='/password-email' component={PasswordEmail} />
              <PublicRoute path='/password-reset' component={PasswordReset} />
              <PublicRoute path='/reducer' component={Reducer} />
              
              <Route  path='/login' 
                      render = { props => (
                                  <LoginForm {...props} login={login} />
                                )} 
              />
              
              {/* Private eg authenticated user */}
              <PrivateRoute path='/dashboard'    loggedIn={loggedIn} component={Dashboard} />
              <PrivateRoute path='/my_company' loggedIn={loggedIn} component={MyCompany} />
              <PrivateRoute path='/my_account' loggedIn={loggedIn} component={MyAccount} />
              <PrivateRoute path='/my_proposal' loggedIn={loggedIn} component={MyProposal} />
              <PrivateRoute path='/change_password' loggedIn={loggedIn} component={Password} />
              <PrivateRoute path='/movies'  loggedIn={loggedIn} component={Movies} />
              <PrivateRoute path='/movie/:id/play'  loggedIn={loggedIn} component={MoviePlay} />
              <PrivateRoute path='/faq' loggedIn={loggedIn} component={Faq} />
              
          </Switch>

        </div>
      </div>  
    </Router>
  );
};
export default App;