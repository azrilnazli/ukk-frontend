import React from 'react';
import apiClient from '../../services/api';



const Comment = () => {

    const [comments,setComments] = React.useState(null)

    React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/company/get_comments', { signal: abortCont.signal} )
        .then(response => {
            console.log(response.data)
            setComments(response.data.messages)
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render

    return (
    <>
    { comments ? 
    <div className='row mt-3 ms-1'>
        <div className="card border-danger">
          <div className="card-body">
            <h5 className="card-title">Comment from UKK</h5>
            <p className="card-text">

            {comments}

            </p>
          </div>
        </div>
    </div>
    : null }
    </>
    );
};

export default Comment;