import React, { Fragment } from 'react';

const SystemMsg = ({msg,type}) => {


    return (
        <Fragment>      
            <div className={`alert alert-${type}`} role="alert">
                {msg}
            </div>
        </Fragment>
    );
};

export default SystemMsg;