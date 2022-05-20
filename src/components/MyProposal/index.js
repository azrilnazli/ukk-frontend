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
            console.log('result: got reponse... fetching data')     
            console.log(response.data)
            setProposals(response.data.proposals)
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
    React.useEffect(() => getProposal(), []); // GET request to server

    const proposalList = proposals.map((proposal) => {
       console.log(proposal.id)
       if(proposals){
            return (
                    <Detail proposal={proposal} tender={proposal.tender} created_at={proposal.created_at} />
            )
        }else{
            return null;
        } 
        
    });

    return (
        <div>
        { isPending ? 
            <div  className='container container-fluid bg-light rounded p-3 col-md-12'>loading...</div>
            :
            <>
            { error ? <ErrorMsg title={title} message={error} /> :
                <div>{proposalList}</div>
            }
            </>
        }
        </div>
    );
};

export default MyProposal;