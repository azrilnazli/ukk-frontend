import React , { useState }  from 'react';
import Pdf from './Pdf';
import Video from './Video';
import apiClient from '../../services/api';
import ErrorMsg from './ErrorMsg';
import FormDataTypeB from './FormDataTypeB';

import FormDataTypeA from './FormDataTypeA';
const MyProposal = () => {

    const [isPending, setIsPending] = useState(false)
    const [error,setError] = React.useState('')
    const [title,setTitle] = React.useState('')
    const [proposals, setProposals] = useState([])
    const [destroyed, setDestroyed] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    //const [total, setTotal] = useState([])


    const getProposal = () => {
        setIsPending(true)
        console.log('.............................')
        console.log('Initiate Get Proposal from Server')
        console.log('.............................')
        // get current video id
        console.log('check : get_video from server')
        apiClient.get('/api/proposal/my_proposal') // axios call to server
        .then((response) => {
            setIsPending(false)
            setDestroyed(false)
            console.log('result: got reponse... fetching data')     
            console.log(response.data)
            if(response.data.uploaded === false){
                setTitle('Empty Data'); 
                setError('You don\'t have any proposal being applied.');
            } else {
                setUploaded(true)
                //setTotal(response.data.total) // total applied tender
                setProposals(response.data.proposals) // proposals returned from server
            }
        })
        .catch((error) => {
            setIsPending(false)
            console.error(error.response.data)
            if (error.response.status === 422) {
                setTitle(error.response.data.title); 
                setError(error.response.data.message);
               
            } else {
                setTitle('Restricted area'); 
                setError('You don\'t have permission to enter this area.');
            }
        });
    }
    React.useEffect(() => getProposal(), [destroyed]); // GET request to server

    //console.log(total.sambung_siri)

 
    const proposalList = proposals.map((proposal) => {
   
            return (
                    <>
                    <FormDataTypeB 
                        setDestroyed={setDestroyed} 
                        proposal={proposal} 
                        tender={proposal.tender} 
                        created_at={proposal.created_at} />
                    </>
            )
      
        
    });

    return (
        <div>
        {/* { total.sambung_siri > 1 ? <ErrorMsg title="SAMBUNG SIRI" message="You've submitted more than 1 proposal." />  : null }
        { total.swasta > 2 ? <ErrorMsg title="SWASTA" message="You've submitted more than 2 proposals." />  : null }
             */}
        { isPending ? 
            <div  className='container container-fluid bg-light rounded p-3 col-md-12'>loading...</div>
            :
            <>
            { error ? <ErrorMsg title={title} message={error} /> 
            :
                <>
                { uploaded ?  <div>{proposalList}</div> : null }
               
                </>
            }
            </>
        }

     
        </div>
    );
};

export default MyProposal;