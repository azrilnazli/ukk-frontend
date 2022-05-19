import React , { useState }  from 'react';
import Pdf from './Pdf';
import Video from './Video';
import apiClient from '../../services/api';
import Detail from './Detail';


const MyProposal = () => {

    const [isPending, setIsPending] = useState(false)
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
        .catch((e) => {
            setIsPending(false)
            console.log(e.error);
            console.log("Error getting data");
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
            <>{proposalList}</>
        }


        </div>
    );
};

export default MyProposal;