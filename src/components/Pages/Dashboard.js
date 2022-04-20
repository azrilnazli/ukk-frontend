import React from 'react';
import apiClient from '../../services/api';
import { Redirect } from 'react-router-dom';
import UserData from '../Widgets/UserData';

const Dashboard = () => {

    const [user, setUser]           = React.useState(false);
    const [isPending, setIsPending] = React.useState(true);
    const [profile, setProfile]     = React.useState(
        JSON.parse(localStorage.getItem('userObject'))
    );

    const [videos, setVideos]       = React.useState([]);
    const [duration, setDuration]   = React.useState();
    const [volume, setVolume]       = React.useState();

    // useEffect()
    React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/user', { signal: abortCont.signal} )
        .then(response => {
            return response.data
        })
        .then( data =>{
            setUser(data)
            //console.log(data)
            
            // Put the object into storage
            sessionStorage.setItem('userObject', JSON.stringify(data));
            setIsPending(false) // data loaded, set false
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render

    // statistics
    React.useEffect(() => {
        const abortCont = new AbortController();
        apiClient.get('/api/user/statistics', { signal: abortCont.signal} )
        .then(response => {
            return response.data
        })
        .then( data => {
  
            console.log(data)
            setDuration(data.duration)
            setVolume(data.volume)
            data.videos && setVideos(data.videos)
  
        })
        .catch(error => console.error(error));
        return () => abortCont.abort();    
    }, [] ); // Empty array [] means this only run on first render
    
    return (

        <div className='container container-fluid bg-light rounded p-3'>

            { isPending && <div>Loading...</div> }
            { user &&  <UserData user={user} videos={videos} duration={duration} volume={volume}/>}
        
        </div>
    );
};

export default Dashboard;
