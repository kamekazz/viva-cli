import React from 'react'
// import MySong from './MySong'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

export default function Myplaylist(props) {


  const songs = props.mylist.map(song =>{
    return (
    
      
        <li key={song._id}>
          <img src={song.imageUrl} alt={song.imageUrl} />
          <p>title: {song.title}</p>
          <h3>vote: {song.vote}</h3>
          <button  onClick={()=> props.voteUp(song._id)}>+</button>
          <button  onClick={()=> props.voteDon(song._id)}>-</button>
          <hr></hr>
        </li>
    

    )
  })
  
  return (
    <div>
      <Card raised={true} className="live-list"><Typography  variant="h5" component="h2">live Playlist</Typography></Card >
      <ul>
        {songs}
      </ul>
      
    </div>
  )
}
