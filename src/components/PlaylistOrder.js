import React from 'react'
import { Link } from 'react-router-dom';

export default function PlaylistOrder(_props) {
    const playlistRenderLink = _props.playlistArry.map(pl =>{
        return (
            <div key={pl._id}>
                <Link to={`/playlist/${pl._id}`}>
                <p>NEME: {pl.name} </p>
                <p>CREATED: {pl.created} </p>
                <p>ID: {pl._id} </p>
                <hr></hr>
                </Link>
            </div>
        )
    }
)


  return (
    <div>
      {playlistRenderLink}
    </div>
  )
}




