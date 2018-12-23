import React ,{Component}from 'react'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import MusicNote from '@material-ui/icons/MusicNote';
import Slide from '@material-ui/core/Slide';

export default class VideoListItem extends Component {
 
  state={
    item:true
  }

render() {
  const { video } = this.props
  const imageUrl = video.snippet.thumbnails.default.url
  const title = video.snippet.title

  const removeSer = async (video)=>{
    await this.setState({item:false})

    setTimeout(() => {
      this.props.addvideoToMyList(video)
    }, 500);
    
  }

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
    <Slide direction='right' in={this.state.item}  >
      <Card className="card-serch-song seleteson"  onClick={(e)=> {
        removeSer(video)
      }
        }  >
        {/* <img  className="card-serch-song-item1" src={imageUrl} alt={imageUrl} /> */}
        <div  className="card-serch-song-item2 seleteson" >
        <Grid container >
        <Grid item xs zeroMinWidth>
          <Typography component="h6" noWrap className="seleteson" align="center" variant="h6">
           <MusicNote />{title}
          </Typography>
        </Grid>
        </Grid>
        </div>
      </Card>
    </Slide>
  )
}



}




