import React from "react";
import { useParams } from "react-router-dom";
import VideoJSPlayer from "../VideoJS";
import ReactHLSPlayer from "../ReactHLSPlayer";
import VideoReactPlayer from "../VideoReactPlayer";


export default function MoviePlay(props) {
    const { id } = useParams();
    return (
      <div className='container container-fluid bg-light rounded p-3 '>
      
        { <VideoJSPlayer id={id} /> }
        {/* { <ReactHLSPlayer id={id}/> } */}
        {/* { <VideoReactPlayer id={id} />} */}
      </div>
    );
  }