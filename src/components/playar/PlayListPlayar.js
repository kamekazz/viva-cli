import React, { Component } from 'react'
import confing from '../../confing'
import YTSearch from 'youtube-api-search'
import _ from 'lodash'
import SearchBar from '../playar/SearchBar';
import VideoDetail from '../playar/VideoDetail'
import VideoList from './VideoList'
import Myplaylist from './Myplaylist'
import axios from 'axios';

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
    this.videoSearch(this.props.match.params.name)
    this.getMyList()
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term },  (videos) => {
      this.setState({
        videos: videos,
       selectedVideo: videos[0]
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
      this.getMyList()
      console.log('data back',response.data.message)
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
        `http://127.0.0.1:3090/api/playlist/songs/${this.props.match.params.id}`,
        yourConfig
      )
      console.log('message: ',response.data.message)
      console.log('data back',response.data.data)
    } catch (e) {
      console.log(e)
    }
  }




  
  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 700)
    return (
      <div className="App">
            <SearchBar onSearchTermChange={videoSearch}/>
      <div className="row">
        <div className="now-playing">
          <VideoDetail video={this.state.selectedVideo}/>
          <Myplaylist mylist={this.state.songInlist} />
        </div>
        <VideoList 
            addvideoToMyList={this.addvideoToMyList}
            videos={this.state.videos}>
        </VideoList>
      </div>
  

        

        
      </div>
    );
  }


}


export default PlayListPlayar