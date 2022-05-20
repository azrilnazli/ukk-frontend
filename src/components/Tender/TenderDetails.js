import { render } from '@testing-library/react';
import React from 'react';
const collect = require('collect.js'); 

const TenderDetails = ({tender}) => {

    const collection = collect(tender.languages)

    const languageList = collection.map((language) => 
        <span className="badge bg-secondary">{language}</span>
    );
    // collection.each((item) => {
    //     console.log(item)
    // })

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
        
        </div>
);
};

export default TenderDetails;