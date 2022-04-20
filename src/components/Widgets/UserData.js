import React from "react";
const UserData = (props) => {

    const listItems = props.videos.map((data, key) =>
        <li key={key}>{data.title} <small>(  {data.pageviews} times,  {data.duration} minutes, {data.volume} ) </small></li>
    );
    return ( 

        <>
        <h2>User's Dashboard</h2>
        Name : {props.user.name}
        <br />
        Email : {props.user.email} 
        <br />
        Created : {props.user.created_at}
        <hr />
        <h2>Watched Videos</h2>
        <p>Total watch time : { props.duration} minutes | Total volume data : { props.volume} </p>
        <ol>
            {props.videos && listItems}
        </ol>
        </>
     );
}
 
export default UserData;