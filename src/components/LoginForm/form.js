import React, { useState,Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';


const LoginForm = ({    
                    authError, 
                    errorMsg,
                    unknownError,

                    email,
                    setEmail,
                    emailError,
                    emailErrorMsg,

                    password,
                    setPassword,

                    handleSubmit,
                    handleClick, 

                    isPending,
                 
                
                }) => {

    const [showRegister, setShowRegister] = useState('true');

    // function checkDate(){
    //     // disable registration date
    //     let date1 = new Date();
    //     let date2 = new Date('May 14, 2022 23:59:00');
    
    //     if(date1 > date2){
    //         // redirect to login
    //         setShowRegister(false)
    //       //console.log('dah lepas')
    //     }
    // }

    // React.useEffect(() => checkDate(), []); 
    
                    
    return (
        <Fragment>       
        <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">

                <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-user"></i></span>
                <input
                    type="email"
                    name="email"
                    className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                />
                {emailError ? <span className="invalid-feedback" ><strong>{emailErrorMsg}</strong></span> : null }  


        </div>


        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-lock"></i></span>
            <input
                type="password"
                name="password"
                className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
        </div>

        <div className="row  mb-0">
            <div className="col-md-8 ">
                
                <button disabled={isPending} onClick={handleSubmit} type="submit" className="btn btn-primary">
                { isPending ? <i className="fa fa-cog { isPending ? fa-spin : null } "></i> : " " }
                &nbsp;Log In
                </button>
            
                {/* { showRegister ? 
                <button onClick={handleClick} type="button" className="m-2 btn btn-warning">Register</button>
                :
                null 
                } */}
                <button onClick={handleClick} type="button" className="m-2 btn btn-warning">Register</button>

                <NavLink  to='/password-email' className="btn btn-link">Forgot Your Password ?</NavLink>
            </div>
        </div>
        
        
        </form>
        </Fragment>
    );
};

export default LoginForm;