import React from 'react';

const ErrorMsg = ({title,message}) => {
    return (
        <div className="card mt-3">
                <div className="card-header text-danger">
                    <h3><i class="fas fa-exclamation"></i> {title}</h3>               
                </div>
                <div className="card-body">
                    {message}             
                </div>
        </div>
    );
};

export default ErrorMsg;