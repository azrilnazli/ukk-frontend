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
            <h2>{tender.programme_category} - {tender.programme_code}</h2>
            </div>

            <div className="card-body">
                <div className="row">
            
                    <div className='col-md-3 bg-light rounded'>

                        <table className='table '>
                            <tr>
                                <th>ID</th>
                                <td><span className="badge bg-secondary">{tender.id}</span></td>
                            </tr>
                            <tr>
                                <th>Language</th>
                                <td>{languageList}</td>
                            </tr>
                            <tr>
                                <th>Channel</th>
                                <td><span className="badge bg-secondary">{tender.channel}</span></td>
                            </tr>
                            <tr>
                                <th>Category</th>
                                <td><span className="badge bg-secondary">{tender.programme_category}</span></td>
                            </tr>
                            <tr>
                                <th>Code</th>
                                <td><span className="badge bg-secondary">{tender.programme_code}</span></td>
                            </tr>  
                            <tr>
                                <th>Episode</th>
                                <td><span className="badge bg-secondary">{tender.number_of_episode}</span></td>
                            </tr>
                            <tr>
                                <th>Duration</th>
                                <td><span className="badge bg-secondary">{tender.duration}</span></td>
                            </tr>                                                                      
                        </table>      
                    </div>
                    <div className='col-md-7'>
                        <div className="card-body">
                        <h5 className="card-title">NEED STATEMENT</h5>
                        <p className="card-text">
                        {/* <div dangerouslySetInnerHTML={{__html:tender.description}} /> */}
                        <NewLineToBr>{tender.description}</NewLineToBr>
                        </p>
                        </div>
                    </div>
            </div>
        </div> {/* card */}

    </div>
);
};

export default TenderDetails;