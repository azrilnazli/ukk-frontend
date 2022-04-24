import React from 'react';
import { ErrorMessage, useField} from 'formik';

function TextField({label, ...props}) {
    const [field, meta] = useField(props)
    return (
        <div className='mb-2'>
            <label htmlFor={field.name}>{label}</label>
            <input 
                className={`form-control ${meta.touched && meta.error && 'is-invalid'}`}
                {...field}
                {...props}
                autoComplete="off"
            />    
            {props.error ? 'ada error' : null}
            <ErrorMessage component="span" className="invalid-feedback" name={field.name} />
        </div>
        
    );
}

export default TextField;