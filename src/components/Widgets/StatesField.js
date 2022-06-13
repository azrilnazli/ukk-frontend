import React from 'react';
import Form  from 'react-bootstrap/Form';

const StatesField = (props) => {


    const [listOfStates, setListOfStates] = React.useState(
        [
            
            "Johor",
            "Kedah",
            "Kelantan",
            "Melaka",
            "Negeri Sembilan",
            "Pahang",
            "Pulau Pinang",
            "Perak",
            "Perlis",
            "Sabah",
            "Sarawak",
            "Selangor",
            "Terengganu",
            "WP Kuala Lumpur",
            "WP Labuan",
            "WP Putrajaya",
          ]        
    );

    return (
        <React.Fragment>
        <label htmlFor={props.name}>{props.label}</label>
        
        <Form.Select
            name={props.name}
            //className={"form-control" + (props.error ? ' is-invalid' : '')}
            onChange={props.onChange}    
            isInvalid = {(props.error ? true : false)}
            value={props.value}
        >
            <option value="">Select your state</option>
            { listOfStates?.map( (state, index) => (
                <option value={state}>{state}</option>
            ))}
       </Form.Select>
       
        {props.error ? 
            <span className="invalid-feedback" ><strong>{props.error}</strong></span> 
            : 
            null  
        }  
        </React.Fragment>        
    );

};

export default StatesField;