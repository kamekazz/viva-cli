import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';



 function VideoListItem(props) {
  const { video } = props;
  const imageUrl = video.snippet.thumbnails.default.url
  const title = video.snippet.title

  

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
    <Card className="card-serch-song" >
        <img  className="card-serch-song-item1" src={imageUrl} alt={imageUrl} />
        <CardContent  className="card-serch-song-item2" >
          <Typography component="h6" variant="h6">
          {tamanoNormal(title,40)}
          </Typography>
        </CardContent>
        <div  className="card-serch-song-item3" >
          <Button    variant="contained" color="secondary"  onClick={()=> props.addvideoToMyList(video)}  aria-label="Play/pause">
            <AddIcon />
          </Button >
        </div>
    </Card>
  )
}







export default VideoListItem





