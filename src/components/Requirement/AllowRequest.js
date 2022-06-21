import React from 'react';
import apiClient from '../../services/api';

const AllowRequest = (props) => {

    const [isPending,setIspending] = React.useState(true)
    const [showSubmitButton,setshowSubmitButton] = React.useState(true)

    const getTenderDetailList = () => {
        apiClient.get('/api/company-approvals/allow-request/' + props.tender_detail_id ) 
        .then(response => {
            console.log(response.data)
            setIspending(false)
            setshowSubmitButton(response.data.status) // boolean
        })
        .catch(error => { 
            setIspending(false)
            console.error(error.response.data)

        });
    }
    React.useEffect(() => getTenderDetailList(), []); 

    return (
        isPending   ? 
                    <span>Loading...</span> 
                    : showSubmitButton ? 
                                        <button 
                                        onClick={props.handleSubmit} 
                                        className='btn btn-primary btn-sm'
                                        >Submit</button> 
                                        : 
                                        <button 
                                        onClick={props.handleSubmit} 
                                        disabled
                                        className='btn btn-secondary btn-sm'
                                        >Submit</button>
    )
}

export default AllowRequest;