import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';



 function VideoListItem(props) {
  const { video } = props;
    const imageUrl = video.snippet.thumbnails.default.url
  return (
    <Card className="card-serch-song" >
      <div >
        <img  className="card-serch-song-img"src={imageUrl} />
        <CardContent >
          <Typography component="h5" variant="h5">
          {video.snippet.title}
          </Typography>
        </CardContent>
        <div >
          <Button    variant="contained" color="secondary"  onClick={()=> props.addvideoToMyList(video)}  aria-label="Play/pause">
            <AddIcon />
          </Button >
        </div>
      </div>

      </Card>
  )
}







export default VideoListItem

// function VideoListItem({video , addvideoToMyList}) {



