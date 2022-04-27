import React from 'react';

const RadioButton = (props) => {
    return (

    <React.Fragment>
    <label htmlFor={props.name}>{props.label}</label>
    <input
        name={props.name}
        type={ props.type ? props.type : 'text'}     
        className={"form-control" + (props.error ? ' is-invalid' : '')}
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={props.value}    
        onChange={props.onChange}
        checked={state.is_mof_active.value == 1 ? 'checked' : ''} 
    />
    
    {props.error ? 
        <span className="invalid-feedback" ><strong>{props.error}</strong></span> 
        : 
        null 
    }  
    </React.Fragment>
   
    );
};

export default RadioButton;