import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

const Form = ({    
 
                    name,
                    setName,
                    nameErrorMsg,

                    email,
                    setEmail,
                    emailErrorMsg,

                    password,
                    setPassword,
                    passwordErrorMsg,

                    passwordConfirmation,
                    setPasswordConfirmation,
         
                    handleSubmit,
                    isPending,
                
                }) => {
             

    return (
        <Fragment>
            
                        
            <form onSubmit={handleSubmit}>


                {/* <div className="input-group mb-3">
                    
                    <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-user"></i></span>
                    <input
                        type="name"
                        name="name"
                        className={"form-control" + ( nameErrorMsg  ? ' is-invalid' : '')}
                        placeholder="Your fullname"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                    />
                    {nameErrorMsg ? <span className="invalid-feedback" ><strong>{nameErrorMsg}</strong></span> : null }  
                    </div> */}


                    <div className="input-group mb-3">
                    
                            <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-envelope"></i></span>
                            <input
                                type="email"
                                name="email"
                                className={"form-control" + (emailErrorMsg ? ' is-invalid' : '')}
                                placeholder="Your E-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            />
                            {emailErrorMsg ? <span className="invalid-feedback" ><strong>{emailErrorMsg}</strong></span> : null }  
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

                    
                    <div className="input-group mb-3">
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

                    <button disabled={isPending} onClick={handleSubmit} type="submit" className="btn btn-primary">
                    { isPending ? <i className="fa fa-cog { isPending ? fa-spin : null } "></i> : " " }
                    &nbsp;Register
                    </button>
                    &nbsp;
                    <NavLink  to='/login' className="btn btn-link">Back to Login</NavLink>

                </form>
        </Fragment>
    );
};

export default Form;

        
        