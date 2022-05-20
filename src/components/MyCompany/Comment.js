import React from 'react';
import apiClient from '../../services/api';



const Comment = () => {

    const [comments,setComments] = React.useState(null)
    const [isPending, setIsPending] = React.useState(false)

    React.useEffect(() => {
        setIsPending(true)
        const abortCont = new AbortController();
        apiClient.get('/api/company/get_comments', { signal: abortCont.signal} )
        .then(response => {
            //console.log(response.data)
            setIsPending(false)
            setComments(response.data.messages)
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render

    return (
    <>
    { isPending ? 

    <span>loading...</span>
         

    : 
    <span>{comments}</span>
    }
    </>
    );
};

export default Comment;