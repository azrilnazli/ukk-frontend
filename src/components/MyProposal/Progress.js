import React from 'react';

const Progress = ({percentage}) => {
    return (
    <div className="progress">
        <div 
        className="progress-bar" 
        role="progressbar" 
        style={{ width: `${percentage}%` }}
        >Uploading {percentage}%</div>
    </div>
    );
};

export default Progress;