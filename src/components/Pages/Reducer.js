import React from 'react';
import { Formik, Form } from 'formik';
import TextField from '../Widgets/ReducerTextField';
import * as Yup from 'yup';


const Reducer = () => {

    // const validate = Yup.object({
    //     firstname: Yup.string()
    //         .max(15, 'Must be 15 characters or less')
    //         .required('Required'),
    //     lastname: Yup.string()
    //         .max(15, 'Must be 15 characters or less')
    //         .required('Required'),
    //     email: Yup.string()
    //         .email('Email is invalid')
    //         .required('Required'),
    // });


 
    // error from Laravel
    const [state, setState] = React.useState({ 
    
        firstname: {
            value: '',
            error: ''    
        },
        
        lastname: {
            value: '',
            error: ''    
        },    

        email: {
            value: '',
            error: ''    
        },   

    }); // setState

    const collect = require('collect.js'); 
    const fields = collect(state);
    console.log(fields) 

    // change error dynamically
    function handleClick(field,error){
        // alert(field)
        // const name = 'lastname'
        setState(prevState => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                error: [error]    
            },
         }));
    }

    // change input value dynamically
    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target; // object

        setState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                value: [value],
               
            },
         }));
    };

    const handleSubmit = (values) => {
        console.log(values)
    }

    // validation error from laravel
    const validator = (values) => {
        let errors = {}
        errors.firstname = "testtest"
        return errors
    }
  
    
    return (
        
    <Formik
        initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            postcode: '',
            city: '',
            states: ''
        }}

        //validationSchema={validate}

        validate={validator}

        // onSubmit={values => {
        //     console.log(values)    
        // }}
        onSubmit={ values => {handleSubmit(values)}}
    >
        {formik => (
          
            
            <div className='container container-fluid bg-light rounded p-3 col-md-6'>
            {console.log(formik.errors)}
            <Form>
                <TextField
                    label="First Name"
                    name="firstname"
                    type="text"
                    // error from SSR Laravel
                    //error={state.firstname.error}
                />
                <TextField
                    label="Last Name"
                    name="lastname"
                    type="text"
                />

                <TextField
                    label="Email"
                    name="email"
                    type="text"
                />
                <button className="btn btn-dark mt-3">Register</button>
                <button className="btn btn-danger mt-3 ms-2" type="reset">Reset</button>
            </Form>

            </div>
        )}
    </Formik>

    
    );
};

export default Reducer;