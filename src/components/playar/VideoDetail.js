
import React, { Component } from 'react'
import YouTube from 'react-youtube';


export default class VideoDetail extends Component {



  // _onReady = (event) => {
  //   // access to player in all event handlers via event.target
  //   // event.target.pauseVideo();
  //   let data =   event.target.getDuration()
  // }



  render() {

    const opts = {
      height: 500,
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls:0,
        showinfo:0
      }
    };

    const videoId = this.props.video.videoId;


    return (
      <div >
      <div style={{marginBottom:20}}></div>
      <YouTube
        videoId={videoId}
        opts={opts}
        // onStateChange={this._onReady}
        onEnd={this.props.neaxetSong} 
      />
      </div>
    )

  }



}

