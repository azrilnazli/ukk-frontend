import React from 'react';
import { NavLink } from "react-router-dom";

const Detail = ({tender}) => {

    const languageList =tender.languages.map((language) => 
        <span className="badge bg-secondary">{language}</span>
    );

    function NewLineToBr({children = ""}){
        return children.split('\n').reduce(function (arr,line) {
            return arr.concat(
            line,
            <br />
            );
        },[]);
    }

    return (
            <div className="card mt-3">
                <div className="card-header">
                    <div className="d-lg-flex flex-row justify-content-center mt-2">
                        <div className="ms-1 me-1 "><p>ID : <span className="badge bg-secondary">{tender.id}</span></p></div>
                        <div className="ms-1 me-1 "><p>CHANNEL : <span className="badge bg-secondary">{tender.channel}</span></p></div>
                        <div className="ms-1 me-1 "><p>CATEGORY : <span className="badge bg-secondary">{tender.tender_category}</span></p></div>      
                        <div className="ms-1 me-1 "><p>CODE : <span className="badge bg-secondary">{tender.programme_code}</span></p></div>
                        <div className="ms-1 me-1 "><p>LANGUAGE : {languageList}</p></div>
                        <div className="ms-1 me-1 "><p>EPISODES : <span className="badge bg-secondary">{tender.number_of_episode} X {tender.duration}'</span></p></div>
                    </div>                
                </div>

        
                <div className="card-body">
                    <h5 className="card-title">NEED STATEMENT</h5>
                    <p className="card-text">
                    {/* <div dangerouslySetInnerHTML={{__html:tender.description}} /> */}
                    <NewLineToBr>{tender.description}</NewLineToBr>
                    </p>
                    
                </div>
                <div className="card-footer text-center">          
                   
                     <NavLink  to={`/tender/${tender.id}/apply`} className="btn btn-primary">APPLY</NavLink>
                </div>
            </div>
    );
};

export default Detail;