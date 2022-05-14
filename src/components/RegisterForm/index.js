import React from 'react';
import { Redirect } from 'react-router-dom';
import apiClient from '../../services/api';
import Form from './form';
import SystemMsg from '../Alerts/SystemMsg';

const RegisterForm = () => {

    const [isPending, setIsPending] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

    const [toLogin, setToLogin] = React.useState(false);
    const [toRegister, setToRegister] = React.useState(false);
    
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);

    const [errorMsg, setErrorMsg] = React.useState(false);
    const [nameErrorMsg, setNameErrorMsg] = React.useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = React.useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = React.useState(false);

    const [date,setDate] = React.useState( new Date().toLocaleString() )


    // disable registration date
    let date1 = new Date();
    let date2 = new Date('May 14, 2022 23:59:00');

    if(date1 > date2){
        // redirect to login
       
        return <Redirect to='/login' />
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true) // registration process begin , set to true

        setNameErrorMsg(false);
        setEmailErrorMsg(false);
        setPasswordErrorMsg(false);

        setAuthError(false);
        setUnknownError(false); 

        apiClient.post('/api/auth/register', {

           // name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,

        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                setIsPending(false) // registration process done , set to false
                setToLogin(true); // redirect
            }
        }).catch(error => {
            setIsPending(false) // registration process done , set to false
           // console.log(error.response);
            if (error.response && error.response.status === 422) {
                
                setAuthError(true);
                setErrorMsg(error.response.data.message);

                if (error.response.data.errors.name) {
                    setNameErrorMsg(error.response.data.errors.name[0]);
                }  

                if (error.response.data.errors.email) {
                    setEmailErrorMsg(error.response.data.errors.email[0]);
                }       

                if (error.response.data.errors.password) {
                    setPasswordErrorMsg(error.response.data.errors.password[0]);
                }    

            } else {
                setUnknownError(true);
                console.error(error);
            }
        });
      
    }

    if (toLogin === true) {
        return <Redirect to='/login' />
    }

    if (toRegister === true) {
        return <Redirect to='/register' />
    }

  
    
    return (
        <div className="row">
            <div className="col-lg-4">
                <img className="img-fluid rounded" src="/img/login.jpg" alt="" />
            </div>
            
            <div className="col-lg-8">
            
            <div className="card"  >

                <div className="card-body">
                    {date}
                {authError ? <SystemMsg msg= { errorMsg ? errorMsg : 'Error while submitting' } type='danger' /> : null }
                <h3> <i className="fa fa-cog"></i> Register</h3>
                <p className="card-text">Please use valid email for registration.</p>
           
                         
                    <Form 
                    name={name}
                    setName={setName}
                    nameErrorMsg={nameErrorMsg}

                    email={email}
                    setEmail={setEmail}
                    emailErrorMsg={emailErrorMsg}

                    password={password}
                    setPassword={setPassword}
                    passwordErrorMsg={passwordErrorMsg}

                    passwordConfirmation={passwordConfirmation}
                    setPasswordConfirmation={setPasswordConfirmation}
        
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                                    
                    /> 
                 
                </div>
            </div>
            </div>
        </div>
    );
};

export default RegisterForm;