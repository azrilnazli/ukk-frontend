import React from 'react';

const Progress = ({percentage}) => {
    return (
    <div className="progress">
        <div 
        className="progress-bar" 
        role="progressbar" 
        style={{ width: `${percentage}%` }}
        >{percentage}%</div>
    </div>
    );
};

export default Progress;