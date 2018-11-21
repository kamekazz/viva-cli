import React from 'react'
// import MySong from './MySong'


export default function Myplaylist(props) {


  const songs = props.mylist.map(song =>{
    return (
      <li key={song._id}>
        <img src={song.imageUrl} />
        <p>{song.title}</p>
        <button>+</button>
        <button>-</button>
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
