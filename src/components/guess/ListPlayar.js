import React, { Component } from 'react'
import confing from '../../confing'
// import YTSearch from 'youtube-api-search'
import _ from 'lodash'
import SearchBar from '../playar/SearchBar';
import VideoList from '../playar/VideoList'
import Myplaylist from '../playar/Myplaylist'
import axios from 'axios';


const API_KEY = confing.API_KEY
const API_URL = confing.apiUrl



 class ListPlayar extends Component {
  state={
    playListId:'',
    songInlist:[],
    videos:[],
    selectedVideo: null
  }



  componentDidMount(){
    this.setState({playListId:this.props.match.params.id})
    this.timerfiveSc()
    this.getMyList()
  }

  timerfiveSc() {
    setInterval(() => { 
      this.getMyList()
    }, 5000);
  }




  videoSearch=(term)=>{
    let ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
    let params = {
      part: 'snippet',
      key: API_KEY,
      q: term,
      type: 'video',
      videoCategoryId:10,
      maxResults:12
    };
    axios.get(ROOT_URL, { params: params })
    .then((response) => {
        this.setState({
          videos: response.data.items
        })
    })
    .catch((error) => {
      console.error(error)
    });
  }
  trigger() {
    setInterval(() => { 
      this.getMyList()
    }, 5000);
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
        <h1>Visita....</h1>
        <SearchBar onSearchTermChange={videoSearch}/>
          <VideoList 
            addvideoToMyList={this.addvideoToMyList}
            videos={this.state.videos}
          />
          <Myplaylist
           mylist={this.state.songInlist}
           voteUp={this.voteUp}
           voteDon={this.voteDon}
          />
      </div>
    );
  }


}


export default ListPlayar