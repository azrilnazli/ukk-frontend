import React from 'react';
import apiClient from '../../services/api';

const Home = () => {

    const [isPending,setIspending] = React.useState(true)
    const [title,setTitle] = React.useState('')
    const [content,setContent] = React.useState('')

    const getTenderDetailList = () => {
        apiClient.get('/api/contents/dashboard_text' ) 
        .then(response => {
            console.log(response.data)
            setIspending(false)
            setTitle(response.data.title) // string
            setContent(response.data.content) // string
        })
        .catch(error => { 
            setIspending(false)
            console.error(error.response.data)

        });
    }
    React.useEffect(() => getTenderDetailList(), []); 

    return (
        <div className='container container-fluid bg-light rounded p-3 mt-2'>
        { isPending   ? 
                    <span>Loading...</span> 
                    : 
                    <>
                    <h2>{title}</h2>
                    <pre>{content}</pre>
                    </>
                      
        }
        </div> 
    )
}

export default Home;