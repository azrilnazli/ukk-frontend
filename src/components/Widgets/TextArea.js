import React from 'react';

const TextField = (props) => {
    return (

    <React.Fragment>
    <label htmlFor={props.name}>{props.label}</label>
    <textarea
        name={props.name}
        type={ props.type ? props.type : 'text'}     
        className={"form-control" + (props.error ? ' is-invalid' : '')}
        disabled={props.disabled}
        placeholder={props.placeholder}
        rows="5"
        onChange={props.onChange}
        value={props.value}
    />
    
    {props.error ? 
        <span className="invalid-feedback" ><strong>{props.error}</strong></span> 
        : 
        null 
    }  
    </React.Fragment>
   
    );
};

export default TextField;