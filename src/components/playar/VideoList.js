
import VideoListItem from './VideoListItem'
import React, { Component } from 'react'

export default class VideoList extends Component {

  render() {

    const videoItems  =  this.props.videos.map((video) =>{
        return (
            <VideoListItem
            addvideoToMyList={this.props.addvideoToMyList}
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
}

