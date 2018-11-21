import React from 'react'
import VideoListItem from './VideoListItem'

function VideoList(props) {
    const videoItems  =  props.videos.map((video) =>{
        return (
            <VideoListItem
            addvideoToMyList={props.addvideoToMyList}
                key={video.etag}
                video={video} 
            />
        )
    })


  return (
    <ul className="col-md-4 list-group">
        {videoItems}
    </ul>
  )
}

export default VideoList