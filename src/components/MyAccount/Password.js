import React, { useState,useEffect,Fragment } from 'react';
import apiClient from '../../services/api';
import TextField from './TextField';
const collect = require('collect.js'); 

const Password = () => {
    const initialValues = {
        current_password: { value: '',error: '' },
        password: { value: '',error: '' },
        password_confirmation: { value: '',error: '' },
  
    }
    const [state, setState] = React.useState(initialValues)
    const [isPending, setIsPending] = useState(true);    
    const [showForm, setShowForm] = useState(false)
    const [showStatus, setShowStatus] = useState(false)

    // change input value dynamically
    const updateStateValue = (field,value) => {

        setState(prevState => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value: value,   
                }
            }));
    };

    // change input value dynamically
    const updateStateError = (field,error) => {
    
        setState(prevState => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                error: error,   
                }
            }));
    };

    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target; // object

        setState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                value: value,
            },
         }));
    };

    const handleEdit = () => {
        // clear error
        const fields = collect(state);
        fields.each( (error,field) => {
            updateStateError(field, null)
        })
        //console.log('edit button clicked')
        setShowForm(true)
    }

    const handleCancel = () => {
        //console.log('cancel button clicked')
        setShowForm(false)
    }

    const newPassword = (e) => {
        e.preventDefault();

        // reset the error
        const fields = collect(state);
        fields.each( (error,field) => {
            updateStateError(field, null)
        })

        // post the data
        apiClient.post('/api/user/new_password', {
            password: state.password.value,
            password_confirmation: state.password_confirmation.value,
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                setIsPending(false) // registration process done , set to false
                setShowForm(true)
                setShowStatus(true)

                const fields = collect(state);
                fields.each( (value,field) => {
                    updateStateValue(field, null)
                })
            }
        }).catch(error => {
            setIsPending(false) // registration process done , set to false       
            console.log(error.response)
            if (error.response.status === 401) {
                console.log(error.response)
                updateStateError('current_password','error 401')
            }
            if (error.response.status === 422) {
                const errors = collect(error.response.data.errors); 
                errors.each( (error,field) => {
                    updateStateError(field,error)  
                })
            }  
        }); 
    }

    const checkPassword = (e) => {
        // reset the error
        const fields = collect(state);
        fields.each( (error,field) => {
            updateStateError(field, null)
        })
     
        updateStateError('current_password','')
        e.preventDefault();
        console.log( state.current_password.value)
        // post the data
        apiClient.post('/api/user/check_password', {
            current_password: state.current_password.value,
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                setIsPending(false) // registration process done , set to false
                setShowForm(true)
            }
        }).catch(error => {
            setIsPending(false) // registration process done , set to false       
            console.log(error.response)
            if (error.response.status === 401) {
                console.log(error.response)
                updateStateError('current_password','Wrong password')
            }
            if (error.response.status === 422) {
                const errors = collect(error.response.data.errors); 
                errors.each( (error,field) => {
                    updateStateError(field,error)  
                })
            }    
        });   
    }

    return (

        <Fragment>
        <div className="card mt-3">
            <h5 className="card-header">Change Password</h5>
            <div className="card-body">
                <Fragment>
                        { showStatus ? 
                        <div className="alert alert-success" role="alert">
                        Password successfully updated.
                        </div>
                        : null }
                </Fragment>

                <div className="row g-3 align-items-center">

                    { showForm ? 
                    
                        <Fragment>
                        <div className="col-auto">
                            <label className="col-form-label">New Password</label>
                        </div>
                        <div className="col-auto">
                                <TextField
                                            type="password"
                                            name="password"  
                                            value={state.password.value}       
                                            onChange={handleChange}
                                            onClick={() => updateStateValue('password', '')}
                                            error={state.password.error}
                                        />
                        </div>

                        <div className="col-auto">
                            <label className="col-form-label">New Password</label>
                        </div>
                        <div className="col-auto">
                                <TextField
                                            type="password"
                                            name="password_confirmation"         
                                            onChange={handleChange}
                                            error={state.password_confirmation.error}
                                        />
                        </div>

                        <div className="col-auto">
                            <button onClick={newPassword} type="submit" className="btn btn-primary">Submit</button> 
                        </div>
                        </Fragment>

                    :
                    <Fragment>
                    <div className="col-auto">
                        <label className="col-form-label">Current Password</label>
                    </div>
                    <div className="col-auto">
                            <TextField
                                        type="password"
                                        name="current_password"         
                                        onChange={handleChange}
                                        error={state.current_password.error}
                                    />
                    </div>
                    <div className="col-auto">
                        <button onClick={checkPassword} type="submit" className="btn btn-primary">Authenticate</button> 
                    </div>
                    </Fragment>
                    }
                    </div>
                </div>
        </div>
        </Fragment>

    );
};

export default Password;

        
        