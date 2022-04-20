import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import apiClient from '../../services/api';
import SystemMsg from '../Alerts/SystemMsg';

const PasswordEmail = () => {

    const [isPending, setIsPending] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [successMsg, setSuccessMsg] = React.useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = React.useState('');
    const [unknownError, setUnknownError] = React.useState(false);


    const handleSubmit = (e) => {
  
        e.preventDefault(); // google PreventDefault()
        setIsPending(true) // form submission begin , set to true  
        setEmailErrorMsg(false);
        //console.log(e);

        // form submission using axios
        apiClient.post('/api/password/email', {
            email: email,
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
             if (error.response && error.response.status === 422) {
                 if (error.response.data.errors.email) {
                     setEmailErrorMsg(error.response.data.errors.email[0]);
                 }       
             }

             if (error.response && error.response.status === 500) {
                if (error.response.data.message) {
                    setEmailErrorMsg(error.response.data.message);
                }       
            }

             setIsPending(false) // form process done , set to false
        });
    }

    return (
        <Fragment>      
            <div className='container container-fluid bg-light rounded p-3 bg-light'> 
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        
                 
                        {successMsg ? <SystemMsg msg='We have emailed your password reset link!' type='success' /> : null }

                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                            <h2>Request Reset Password</h2>
                                <div className="input-group mb-1 mt-1">
                             
                                        <span className="input-group-text" id="inputGroup-sizing-default">
                                        <i className="fa fa-envelope"></i>
                                        </span>
                                        <input
                                          
                                            type="email"
                                            name="email"
                                            className={"form-control" + (emailErrorMsg ? ' is-invalid' : '')}
                                            placeholder="Your E-mail address"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                        />
                                        {emailErrorMsg ? 
                                        <span className="invalid-feedback" ><strong>{emailErrorMsg}</strong></span> : null }  
                                        
                                </div>
                            </div>

                            <button disabled={isPending} onClick={handleSubmit} type="submit" className="btn btn-primary">
                            { isPending ? <i className="fa fa-cog { isPending ? fa-spin : null } "></i> : null }
                            &nbsp; Send Password Reset Link
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

export default PasswordEmail;