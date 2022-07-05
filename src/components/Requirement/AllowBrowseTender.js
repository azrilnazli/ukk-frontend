import React from 'react';
import { BrowserRouter as Router,Link,NavLink  } from 'react-router-dom';
import apiClient from '../../services/api';

const AllowBrowseTender = (props) => {
    const [isPending,setIspending] = React.useState(true)
    const [approvalStatus,setApprovalStatus] = React.useState('')

    const getData = () => {
        apiClient.get('/api/company-approvals/get-approval-status/' + props.tender.id ) 
        .then(response => {
            console.log(response.data)
            setIspending(false)
            setApprovalStatus(response.data.status)
  
        })
        .catch(error => { 
            setIspending(false)
            console.error(error.response.data)

        });
    }
    React.useEffect(() => getData(), [props.isSubmit]);     

    return (
        <>
        { approvalStatus == 'approved' &&
        <div className='row'>
            <div className='col'>
                <div className="alert alert-success" role="alert">
                    <div className='row'>
                        <div className='col-6'>
                        Your application has been approved. Now you can browse 
                        all the available tenders.</div>
                        <div className='col-6 d-lg-flex justify-content-center align-items-center'>
                        <Link to={`/tender_details/${props.tender.id}`} className="btn btn-primary">
                            Browse Tender <span className='ms-2 badge bg-light text-dark'>{ props.tender.tenders_count }</span>
                        </Link>
                        </div>
    
                    </div>
                </div>
            </div>    
        </div>
        }
        </>
    );
};

export default AllowBrowseTender;