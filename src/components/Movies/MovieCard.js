
import React from "react";
import { Redirect, useHistory } from "react-router-dom";



const MovieCard = (props) => {
        
    const src = "http://admin.test/storage/streaming/" + props.id + "/thumbnails/potrait.jpg";

    const history = useHistory();

    function handleClick(){
        //alert(id)
        //console.log('id is ' + id)
        let path = "/movie/" + props.id + "/play"; 
        history.push(path);
    }

    return ( 
        <>

        <div className="card p-2 m-2 mx-auto" style={{width: '15rem'}}>
            <a href="#">
                <img onClick={ () => handleClick(props.id) } src={src} className="card-img-top img-fluid" alt="..." />
            </a>
        </div>
   

        </>
     );
}
 
export default MovieCard;