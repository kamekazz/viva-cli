import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';




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
    <Card className="card-serch-song seleteson"  onClick={()=> props.addvideoToMyList(video)}  >
        <img  className="card-serch-song-item1" src={imageUrl} alt={imageUrl} />
        <div  className="card-serch-song-item2 seleteson" >
          <Typography component="h6" className="seleteson" variant="h6">
          {tamanoNormal(title,40)}
          </Typography>
        </div>
    </Card>
  )
}







export default VideoListItem





