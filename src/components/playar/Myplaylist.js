import React from 'react'
// import MySong from './MySong'


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
      <h3>my song</h3>
      <ul>
        {songs}
      </ul>
      
    </div>
  )
}
