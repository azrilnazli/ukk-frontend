import React , { useState }  from 'react';
import Pdf from './Pdf';
import Video from './Video';
import apiClient from '../../services/api';
import ErrorMsg from './ErrorMsg';
import Detail from './Detail';


const MyProposal = () => {

    const [isPending, setIsPending] = useState(false)
    const [error,setError] = React.useState('')
    const [title,setTitle] = React.useState('')
    const [proposals, setProposals] = useState([])
    const [destroyed, setDestroyed] = useState(false)
    const [uploaded, setUploaded] = useState(false)

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
                setProposals(response.data.proposals)
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

    const proposalList = proposals.map((proposal) => {
   
            return (
                    <>
                    <Detail setDestroyed={setDestroyed} proposal={proposal} tender={proposal.tender} created_at={proposal.created_at} />
                    </>
            )
      
        
    });

    return (
        <div>
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