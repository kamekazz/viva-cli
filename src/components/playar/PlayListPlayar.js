import React, { Component } from 'react'
import confing from '../../confing'
import YTSearch from 'youtube-api-search'
import _ from 'lodash'
import SearchBar from '../playar/SearchBar';
import VideoDetail from '../playar/VideoDetail'
import VideoList from './VideoList'
import Myplaylist from './Myplaylist'
import axios from 'axios';
import requireAuth from '../requireAuth';

const API_KEY = confing.API_KEY
const API_URL = confing.apiUrl



 class PlayListPlayar extends Component {
  state={
    playListId:'',
    songInlist:[],
    videos:[],
    selectedVideo: null
  }



  componentDidMount(){
    this.setState({playListId:this.props.match.params.id})

    this.getMyList()
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term},  (videos) => {
      this.setState({
        videos: videos
      })
    })
  }
  

  addvideoToMyList = async (v)=> {
    let body = {
      playlistId: this.state.playListId,
      title: v.snippet.title,
      description: v.snippet.description,
      videoId: v.id.videoId,
      imageUrl: v.snippet.thumbnails.default.url
    }
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/song/add`,
        body,
        yourConfig
      )
      console.log('data back',response.data.message)
      this.getMyList()
 
    } catch (e) {
      console.log(e)
    }
  }

  getMyList = async ()=> {
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.get(
        `${API_URL}/api/playlist/songs/${this.props.match.params.id}`,
        yourConfig
      )
      this.setState({songInlist: response.data.data})

    } catch (e) {
      console.log(e)
    }
  }

  startPlay = () =>{
    this.setState({
      selectedVideo: this.state.songInlist
    })
    this.removeSong()
  }

  removeSong = async ()=> {
    const testRemove = this.state.songInlist[0]
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.delete(
        `${API_URL}/api/song/delete/${testRemove._id}`,
        yourConfig
      )
      console.log(response)
      this.getMyList()
    } catch (e) {
      console.log(e)
    }
  }

  voteUp = async (ev)=> {
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.get(
        `${API_URL}/api/song/voteup/${ev}`,
        yourConfig
      )
      console.log(response.data.message)
      this.getMyList()
    } catch (e) {
      console.log(e)
    }
  }

  voteDon = async (ev)=> {
    let yourConfig = {
      headers: {
        Authorization:  localStorage.getItem('token')
      }
    }
    try {
      const response = await axios.get(
        `${API_URL}/api/song/voted/${ev}`,
        yourConfig
      )
      console.log(response.data.message)
      this.getMyList()
    } catch (e) {
      console.log(e)
    }
  }




  
  render() {

    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 700)
    return (
      <div className="App">
        <p>https://client-viva.herokuapp.com/xxxxxxx/start/{this.props.match.params.id}</p>
        <SearchBar onSearchTermChange={videoSearch}/>
      <button onClick={this.startPlay}>Play</button>
      <div className="row">
        <div className="now-playing cl-md-3">
        {this.state.selectedVideo && 
          <VideoDetail 
            video={this.state.selectedVideo[0]}
            neaxetSong={this.startPlay}
          />
        }
          <VideoList 
            addvideoToMyList={this.addvideoToMyList}
            videos={this.state.videos}>
          </VideoList>
        </div>
          <Myplaylist
           mylist={this.state.songInlist}
           voteUp={this.voteUp}
           voteDon={this.voteDon}
          />
        </div>
      </div>
    );
  }


}


export default requireAuth(PlayListPlayar);