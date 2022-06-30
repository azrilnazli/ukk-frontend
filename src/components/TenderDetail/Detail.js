import React from 'react';
import { NavLink } from "react-router-dom";

const Detail = ({key,tender}) => {

    const languageList =tender.languages.map((language) => 
        <small><span key={language.title} className="badge bg-warning text-dark ">{language.title}</span></small>
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
            <div key={key} className="card mt-3">
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
            </div>
        
     
                <div className="card-footer text-center">          
                     <NavLink  to={`/tender/${tender.id}/create`} className="btn btn-primary">APPLY</NavLink>
                </div>
            </div>
    );
};

export default Detail;