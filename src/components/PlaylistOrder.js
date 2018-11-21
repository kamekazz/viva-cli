import React from 'react'
import { Link } from 'react-router-dom';

export default function PlaylistOrder(_props) {
    const playlistRenderLink = _props.playlistArry.map(pl =>{
        return (
            <div key={pl._id}>
                <Link name={pl.name} to={`/playlist/${pl._id}/${pl.name}`}>
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




