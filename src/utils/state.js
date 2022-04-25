import React from 'react';


const initialValues = {
    mof_registration_number: { value: '' ,error: '' },
  }

export const [state, setState] = React.useState(initialValues)
 
 // change input value dynamically
  export const updateStateValue = (field,value) => {

    setState(prevState => ({
        ...prevState,
        [field]: {
            ...prevState[field],
            value: value,   
            }
        }));
};

// change input value dynamically
export const updateStateError = (field,error) => {

    setState(prevState => ({
        ...prevState,
        [field]: {
            ...prevState[field],
            error: error,   
            }
        }));
};