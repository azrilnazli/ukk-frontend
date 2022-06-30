import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import apiClient from '../../services/api';
import Form from './form.js';
import SystemMsg from '../Alerts/SystemMsg';
import logo from './logo.png';
import GetContent from './GetContent';


const LoginForm = (props) => {

    const [isPending, setIsPending] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [toHome, setToHome] = React.useState(false);
    const [toRegister, setToRegister] = React.useState(false);
    const [toLogin, setToLogin] = React.useState(false);

    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);

    const [errorMsg, setErrorMsg] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = React.useState(false);

    // handle submit event 
    const handleSubmit = (e) => {
        setIsPending(true) // login process begin , set to true
        e.preventDefault();
        setAuthError(false);
        setUnknownError(false); 
 
        // login attempt
        apiClient.post('/api/auth/login', {
            email: email,
            password: password
        })
        .then(response => {
            // authenticated ? then get the token
            if (response.status === 200) {
                // set token to sessionStorage
                sessionStorage.setItem('token', response.data.data.token);
            }
        })
        .then( () => {
            // get request with Token as Authorization Header via apiClient() helper
            apiClient.get('/api/user') // get current user's profile
            .then(response => {
              
                //props.setUser( response.data.name); // set username
                sessionStorage.setItem('username',  response.data.email);
                
                // call App.js login() and update the global state
                props.login(); 
                
                setIsPending(false); // login process finished , set to false 

                // redirect to user's Home
                setToHome(true);
            });
            
        })
        .catch(error => {

            if(!error.response){
                setAuthError(true);
                setErrorMsg('Cannot establish connection');
                setIsPending(false); // login process finished , set to false 
            }

           // usually error 422
           if( error && error.response && error.response.data && error.response.data.errors){
                //alert(error.response.data.errors.email); 
                setAuthError(true);
                setErrorMsg(error.response.data.errors.email);
                setIsPending(false); // login process finished , set to false 
           }
           
           // error 401
            if(error && error.response && error.response.data && error.response.data.message){
                //alert(error.response.data.message); 
                setAuthError(true);
                setErrorMsg(error.response.data.message);
                setIsPending(false); // login process finished , set to false 
            } 
        });
      
    } // handleSubmit()

    // if user click Register button
    const handleClick = () => setToRegister(true);

    // user redirect after successful login
    if (toLogin === true) {
        return <Redirect to='/login' />
    }

    // user redirect after successful login
    if (toHome === true) {
        return <Redirect to='/home' />
    }
    
    // redirect to register route
    if (toRegister === true) {
        return <Redirect to='/register' />
    }

    // return JSX
    
    return (
        <Fragment>
            <div className="row">
                    <div className="col-lg-4">
                        <img className="img-fluid rounded" src={logo} alt="Logo" />
                    </div>
                    
                    <div className="col-lg-8">
                    
                        <div className="card"  >

                            <div className="card-body">
                            
                
                                {authError ? <SystemMsg msg={errorMsg} type='danger' /> : null }
                               
                                <GetContent />
                                
                          
                                <Form 
                                
                                    authError={authError} 
                                    errorMsg={errorMsg}
                                    unknownError={unknownError}

                                    email={email}
                                    setEmail={setEmail}
                                    emailError={emailError}
                                    emailErrorMsg={emailErrorMsg}

                                    password={password}
                                    setPassword={setPassword}

                                    handleSubmit={handleSubmit}
                                    handleClick ={handleClick}    
                                    
                                    isPending={isPending}
                                />   
                                                              
                            </div>
                        </div>
                    </div>
                </div> 

        </Fragment>
    );
};

export default LoginForm;