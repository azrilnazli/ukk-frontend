import React, { useState,useEffect,Fragment } from 'react';
import apiClient from '../../services/api';
import TextField from './TextField';
const collect = require('collect.js'); 

const Profile = () => {
    const initialValues = {
        firstname: { value: '',error: '' },
        lastname: { value: '',error: '' },
        email: { value: '',error: '' },
        phone: { value: '',error: '' },
        address: { value: '',error: '' },
        postcode: { value: '',error: '' },
        city: { value: '',error: '' },
        states: { value: '',error: '' },
    }
    const [state, setState] = React.useState(initialValues)
    const [isPending, setIsPending] = useState(true);    
    const [showForm, setShowForm] = useState(false)

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // reset the error
        const fields = collect(state);
        fields.each( (error,field) => {
            updateStateError(field, null)
        })

        // post the data
        apiClient.post('/api/user/update', {
            firstname: state.firstname.value,
            lastname: state.lastname.value,
            phone: state.phone.value,
            address: state.address.value,
            postcode: state.postcode.value,
            city: state.city.value,
            states: state.states.value,
        }).then(response => {
            //console.log(response);
            if (response.status === 200) {
                setIsPending(false) // registration process done , set to false
                setShowForm(false)
            }
        }).catch(error => {
            setIsPending(false) // registration process done , set to false       
            if (error.response.status === 422) {
                const errors = collect(error.response.data.errors); 
                errors.each( (error,field) => {
                    updateStateError(field,error)  
                })
            }
        });
    }
   
    useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/user/my_account', { signal: abortCont.signal} )
        .then(response => {
            if(response.data.message === 'not exist'){
                setShowForm(true)
                updateStateValue('email', sessionStorage.getItem('username'))
            } else {
                const fields = collect(response.data);
                fields.each( (value,field) => {
                    //console.log(field)
                    updateStateValue(field, value)
                })
            }
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render


    return (

        <Fragment>
            <div className="card">
                <h5 className="card-header">          
                <div className="d-flex flex-row bd-highlight align-items-center justify-content-between">
                <span className="float-start"> Profile</span>
                {
                showForm ? 
                <span></span> 
                : 
                <a onClick={handleEdit} className=" btn btn-sm btn-primary m-1">Edit</a>
                }
                
                </div>
                </h5>  
                
                <div className="card-body">
            
                    <div className="row mt-3 g-2">
                        <div className="col-md-6">
                            <div className="px-4">
                                <span className="text-uppercase">First Name</span>
                                { 
                                    showForm ? 
                                <TextField
                                    label="First Name"
                                    name="firstname"
                                    placeholder="First Name"
                                    value={state.firstname.value}
                                    //onChange={e => setFirstname(e.target.value)}
                                    onChange={handleChange}
                                    error={state.firstname.error}
                                />
                                    :      
                                    <h4><strong>{ state.firstname.value }</strong></h4> 
                                }
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className=" px-4">
                                <span className="text-uppercase">Lastname</span>
                                { 
                                    showForm ? 
                                <TextField
                                    label="Last Name"
                                    name="lastname"
                                    placeholder="Last Name"
                                    value={state.lastname.value}
                                    onChange={handleChange}
                                    error={state.lastname.error}
                                />
                                    :      
                                    <h4><strong>{ state.lastname.value }</strong></h4> 
                                }
                            </div>
                        </div>

                    </div>

                    <div className="row mt-3 g-2">
                        
                        <div className="col-md-6">
                            <div className=" px-4">
                                <span className="text-uppercase">Email</span>
                                { 
                                    showForm ? 
                                    <TextField
                                        label="E-Mail"
                                        name="email"
                                        disabled="true"
                                        placeholder="E-Mail"
                                        value={state.email.value}
                                        onChange={handleChange}
                                        error={state.email.error}
                                    />
                                    :      
                                    <h4><strong>{ state.email.value }</strong></h4> 
                                }
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className=" px-4">
                                <span className="text-uppercase">Phone Number</span>
                                { 
                                    showForm ? 
                                    <TextField
                                        label="Phone Number"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={state.phone.value}
                                        onChange={handleChange}
                                        error={state.phone.error}
                                    />
                                    :      
                                    <h4><strong>{ state.phone.value }</strong></h4> 
                                }
                            </div>
                        </div>

                    </div>

                    <div className="row mt-3 g-2">
                        <div className="col-md-12">
                            <div className=" px-4">
                                <span className="text-uppercase">Address</span>
                                { 
                                    showForm ? 
                                    <TextField
                                        label="Address"
                                        name="address"
                                        placeholder="Address"
                                        value={state.address.value}
                                        onChange={handleChange}
                                        error={state.address.error}
                                    />
                                    :      
                                    <h4><strong>{ state.address.value }</strong></h4> 
                                } 
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3 g-2">
                        <div className="col-md-4">
                            <div className=" px-4">
                                <span className="text-uppercase">Postcode</span>
                                { 
                                    showForm ? 
                                    <TextField
                                        label="Postcode"
                                        name="postcode"
                                        placeholder="Postcode"
                                        value={state.postcode.value}
                                        onChange={handleChange}
                                        error={state.postcode.error}
                                    />
                                    :      
                                    <h4><strong>{ state.postcode.value }</strong></h4> 
                                }  
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className=" px-4">
                                <span className="text-uppercase">City</span>
                                { 
                                    showForm ? 
                                    <TextField
                                        label="City"
                                        name="city"
                                        placeholder="City"
                                        value={state.city.value}
                                        onChange={handleChange}
                                        error={state.city.error}
                                    />
                                    :      
                                    <h4><strong>{ state.city.value }</strong></h4> 
                                }  
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className=" px-4">
                                <span className="text-uppercase">State</span>
                                { 
                                    showForm ? 
                                    <TextField
                                        label="State"
                                        name="states"
                                        placeholder="State"
                                        value={state.states.value}
                                        onChange={handleChange}
                                        error={state.states.error}
                                    />
                                    :      
                                    <h4><strong>{ state.states.value }</strong></h4> 
                                }   
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3 g-2">
                        
                        <div className="col-md-6">
                            <div className=" px-4">
                                { showForm ? 
                                <>
                                <button onClick={handleSubmit} className="btn btn-primary">Submit</button> 
                                <button onClick={handleCancel} className="btn btn-secondary ms-2">Cancel</button>
                                </>
                                : null }
                                
                            </div>
                        </div>

                    </div>

                    
                </div>
            </div>
        </Fragment>

    );
};

export default Profile;

        
        