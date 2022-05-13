import React from 'react';

const Conversion = ({percentage}) => {
    return (
    <div className="progress mt-2">
        <div 
        className="progress-bar" 
        role="progressbar" 
        style={{ width: `${percentage}%` }}
        >Encoding {percentage}%</div>
    </div>
    );
};

export default Conversion;