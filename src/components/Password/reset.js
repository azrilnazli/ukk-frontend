import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, useLocation } from 'react-router-dom';
import apiClient from '../../services/api';
import SystemMsg from '../Alerts/SystemMsg';


const PasswordReset = () => {

    // A custom hook that builds on useLocation to parse
    // the query string for you.
    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();

    const [isPending, setIsPending] = React.useState(false);
    
    const [successMsg, setSuccessMsg] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState(false);

    const [token, setToken] = React.useState( query.get("token") );
    const [email, setEmail] = React.useState( query.get("email") );
    const [emailErrorMsg, setEmailErrorMsg] = React.useState('');
   
    const [password, setPassword] = React.useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = React.useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

    const handleSubmit = (e) => {
  
        e.preventDefault(); // google PreventDefault()
        setIsPending(true) // form submission begin , set to true  
        setEmailErrorMsg(false);
        //console.log(e);

        // form submission using axios
        apiClient.post('/api/password/reset', {
            token: token,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
        }).then(response => {
            //console.log(response);
            if (response.status === 200) {
                //console.log(response.data.status); // return success
                
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);

                setSuccessMsg(true);
                setIsPending(false); // form process done , set to false
            }
        }).catch(error => {
            setIsPending(false) // form process done , set to false
            console.log(error.response);
             if (error.response.data && error.response.status === 422) {
                
                // server errors, usually token expired
                if(error.response.data.message){
                    setErrorMsg(error.response.data.message);
                }

                // form errors
                if(error.response.data.errors){
                
                    if (error.response.data.errors.email) {
                        setEmailErrorMsg(error.response.data.errors.email[0]);
                    }       
                    if (error.response.data.errors.password) {
                        setPasswordErrorMsg(error.response.data.errors.password[0]);
                    }   
                }
             } else {
                 //setUnknownError(true);
                 console.error(error);
             }
             setIsPending(false) // form process done , set to false
        });
    }

    return (
        <Fragment>      
            <div className='container container-fluid bg-light rounded p-3 bg-light'> 
                <div className="row justify-content-center">
                    <div className="col-md-6">
                   
                        {successMsg ? <SystemMsg msg='Password successfully reset.' type='success' /> : null }
                        {errorMsg ? <SystemMsg msg={errorMsg} type='danger' /> : null }

                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                            <h2>Password Reset</h2>

                                <div className="input-group mb-3 mt-1">
                             
                                        <span className="input-group-text" id="inputGroup-sizing-default">
                                        <i className="fa fa-envelope"></i>
                                        </span>
                                        <input
                                            disabled
                                            type="email"
                                            name="email"
                                            className={"form-control" + (emailErrorMsg ? ' is-invalid' : '')}
                                            placeholder="Your E-mail address"
                                            value={email}
                                            //onChange={e => setEmail(e.target.value)}
                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                        />
                                        {emailErrorMsg ? 
                                        <span className="invalid-feedback" ><strong>{emailErrorMsg}</strong></span> : null }  
                                        
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-lock"></i></span>
                                        <input
                                            type="password"
                                            name="password"
                                            className={"form-control" + (passwordErrorMsg  ? ' is-invalid' : '')}
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            
                                        />
                                </div>

                                    
                                <div className="input-group mb-2">
                                    <span className="input-group-text " id="inputGroup-sizing-default"><i className="fa fa-lock"></i></span>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        className={"form-control" + (passwordErrorMsg  ? ' is-invalid' : '')}
                                        placeholder="Confirm your password"
                                        value={passwordConfirmation}
                                        onChange={e => setPasswordConfirmation(e.target.value)}
                                    
                                    />
                                    {passwordErrorMsg ? <span className="invalid-feedback" ><strong>{passwordErrorMsg}</strong></span> : null } 
                                </div>

                            </div>

                            <button disabled={isPending} onClick={handleSubmit} type="submit" className="btn btn-primary">
                            { isPending ? <i className="fa fa-cog { isPending ? fa-spin : null } "></i> : " " }
                            &nbsp;Reset Password
                            </button>
                            &nbsp;
                            <NavLink  to='/login' className="btn btn-link">Back to Login</NavLink>

                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );

    
};


export default PasswordReset;