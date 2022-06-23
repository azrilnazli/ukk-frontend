import React from 'react';
import apiClient from '../../services/api';

const AllowRequest = (props) => {

    const [isPending,setIspending] = React.useState(true)
    const [isSubmit,setIsSubmit] = React.useState(false)
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
    React.useEffect(() => getTenderDetailList(), [isSubmit]); 

    const handleSubmit = (e) => {
        setIsSubmit(true)
        props.setIsSubmit(true)
        // formData
        const formData = new FormData();
        formData.append('tender_detail_id', props.tender_detail_id); 

        // axios 
        apiClient({
            method: "post",
            url: "/api/company-approvals/request-for-approval",
            data: formData,
        }).then(response => {
            setIsSubmit(false)
            props.setIsSubmit(false)
            console.log(response.data)
        }).catch(error => {
            setIsSubmit(false)
            props.setIsSubmit(false)
            console.log(error)
        })  
    }

    const submit = isSubmit ? <span><i class="fas fa-cog fa-spin"></i> Submit</span> : 'Submit'
    const disable = isSubmit ? 'disabled' : null

    return (
        isPending   ? 
                    <span>Loading...</span> 
                    : showSubmitButton ? 
                                        <button 
                                        onClick={handleSubmit} 
                                        className='btn btn-primary btn-sm'
                                        {...disable}
                                        >{submit}</button> 
                                        : 
                                        <button 
                                     
                                        disabled
                                        className='btn btn-secondary btn-sm'
                                        >{submit}</button>
    )
}

export default AllowRequest;