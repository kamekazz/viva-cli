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
    <div >
        <div className="">
            {videoItems}
        </div>
    </div>

  )
}

export default VideoList