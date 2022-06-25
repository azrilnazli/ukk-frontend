import React from 'react';
import apiClient from '../../services/api';


const GetComment = (props) => {

    const [isPending,setIspending] = React.useState(true)
    const [showComment,setshowComment] = React.useState(false)
    const [data,setData] = React.useState('')


    const getData = () => {
        apiClient.get('/api/company-approvals/get-comment/' + props.tender_detail_id ) 
        .then(response => {
            console.log(response.data)
            setIspending(false) // boolean
            setshowComment(response.data.status) // boolean
            setData(response.data) // string
        })
        .catch(error => { 
            setIspending(false) // boolean
            console.error(error)
        });
    }
    React.useEffect(() => getData(), []); 

    return (
            isPending ? 
                <div className="alert alert-warning" role="alert">
                    <span>checking message...</span>
                </div>
                :
                showComment && 
                <div className="alert alert-warning" role="alert">
                    <small>
                        <span className="badge bg-dark me-1">Message from RTM</span>
                        ~
                        { data ? data.date : <span>loading...</span> } 
                    </small>
                    <hr />
                    <p className="lead">
                        { data ? data.comment : <span>loading...</span> }
                    </p>
                </div> 
    );
};

export default GetComment;