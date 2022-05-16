import React from 'react';

const TextField = (props) => {
    return (

    <React.Fragment>
    <label htmlFor={props.name}>{props.label}</label>
    
    <input
        name={props.name}
        type={ props.type ? props.type : 'text'}     
        className={"form-control" + (props.error ? ' is-invalid' : '')}
        placeholder={props.placeholder}
        value={props.value}    
        onChange={props.onChange}
        accept={ props.accept ? props.accept : ''} 
       
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