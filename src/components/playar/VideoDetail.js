
import React, { Component } from 'react'
import YouTube from 'react-youtube';

export default class VideoDetail extends Component {

  


  render() {
    
    const opts = {
      height: '0',
      width: '0',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls:0,
        showinfo:0
      }
    };


    const videoId = this.props.video.videoId;


    return (
      <div>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={this._onReady}
        onEnd={this.props.neaxetSong} 
      />
      </div>
    )
  }



}

