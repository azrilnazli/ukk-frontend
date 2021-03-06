import React from 'react';

const TextField = (props) => {
    return (

    <React.Fragment>
    <input
        name={props.name}
        type={ props.type ? props.type : 'text'}     
        className={"form-control" + (props.error ? ' is-invalid' : '')}
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={props.value}    
        onChange={props.onChange}
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