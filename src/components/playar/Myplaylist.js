import React from 'react'
// import MySong from './MySong'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

export default function Myplaylist(props) {


  const songs = props.mylist.map(song =>{
    const tamanoNormal = (title,length) =>{
      let trimmedStringTitle = title.substring(0, length)
      if (title.length > length ) {
        trimmedStringTitle = trimmedStringTitle + '....'
      }
      if (title.length < length) {
        
      }
      return trimmedStringTitle
    }

    return (
      <Zoom in={true} key={song._id} >
        <Card className="card-serch-song">
          <img  className="card-serch-song-item1" src={song.imageUrl} alt={song.imageUrl}  />
          <CardContent  className="card-serch-song-item2" >
            <Typography  component="h6" variant="h6">
            {tamanoNormal(song.title,35)}
            </Typography>
          </CardContent>
          <div  className="card-serch-song-item3" >
          <div  className="card-serch-in-bootoncolome" >
          <Button    variant="contained" color="secondary"  onClick={()=> props.voteUp(song._id)} aria-label="Play/pause">
            <KeyboardArrowUp />
          </Button >
          <Button  variant="contained" color="primary" aria-label="Play/pause">
              {song.vote}
          </Button >
          <Button    variant="contained" color="secondary"    onClick={()=> props.voteDon(song._id)} aria-label="Play/pause">
            <KeyboardArrowDown />
          </Button >
          </div>
        </div>
        </Card>
        </Zoom>
    )
  })
  
  return (
    <div>
        {songs}
    </div>
  )
}
